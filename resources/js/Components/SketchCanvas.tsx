import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { Stage, Layer, Line, Rect } from 'react-konva'
import Konva from 'konva'
import colors from 'tailwindcss/colors'

type Tool = 'eraser' | 'pen'

interface CanvasPath {
  tool: Tool
  points: number[]
  strokeColor: string
  strokeWidth: number
}

export interface SketchCanvasRef {
  clearCanvas: () => void
  undo: () => void
  redo: () => void
  exportImage: () => Promise<Blob | null>
  isEmpty: () => boolean
}

interface SketchCanvasProps {
  className?: string
  strokeColor: string
  strokeWidth: number
  isErasing: boolean
  height: number
  width: number
  onChange?: () => void
}

export const SketchCanvas = React.forwardRef<
  SketchCanvasRef,
  SketchCanvasProps
>(
  (
    { className, strokeColor, strokeWidth, height, width, isErasing, onChange },
    ref,
  ) => {
    const [tool, setTool] = useState<Tool>('pen')
    const [currentPaths, setCurrentPaths] = useState<CanvasPath[]>([])
    const [resetStack, setResetStack] = useState<CanvasPath[]>([])
    const [undoStack, setUndoStack] = useState<CanvasPath[]>([])
    const [isDrawing, setIsDrawing] = useState(false)

    const stageRef = useRef<Konva.Stage>(null)

    useEffect(() => {
      setTool(isErasing ? 'eraser' : 'pen')
    }, [isErasing])

    useEffect(() => {
      onChange?.()
    }, [currentPaths, onChange])

    const onMouseDown = useCallback(
      (e: Konva.KonvaEventObject<MouseEvent | TouchEvent>) => {
        e.evt.preventDefault()
        setIsDrawing(true)
        setUndoStack([])

        const pos = e.target?.getStage()?.getPointerPosition()
        if (!pos) return

        setCurrentPaths([
          ...currentPaths,
          { tool, points: [pos.x, pos.y], strokeColor, strokeWidth },
        ])
      },
      [currentPaths, strokeColor, strokeWidth, tool],
    )

    const onMouseMove = useCallback(
      (e: Konva.KonvaEventObject<MouseEvent | TouchEvent>) => {
        e.evt.preventDefault()
        // no drawing - skipping
        if (!isDrawing) return

        const stage = e.target.getStage()
        if (!(stage instanceof Konva.Stage)) return

        const point = stage.getPointerPosition()
        if (!point) return

        const lastLine = currentPaths[currentPaths.length - 1]
        // add point
        lastLine.points = lastLine.points.concat([point.x, point.y])

        // replace last
        currentPaths.splice(currentPaths.length - 1, 1, lastLine)
        setCurrentPaths(currentPaths.concat())
      },
      [currentPaths, isDrawing],
    )

    const onMouseUp = useCallback(() => {
      setIsDrawing(false)
    }, [])

    useImperativeHandle(ref, () => ({
      clearCanvas: () => {
        setResetStack([...currentPaths])
        setUndoStack([])
        setCurrentPaths([])
      },
      undo: () => {
        if (resetStack.length !== 0 && currentPaths.length === 0) {
          setCurrentPaths([...resetStack])
          setResetStack([])

          return
        }

        setUndoStack((stack) => [...stack, ...currentPaths.slice(-1)])
        setCurrentPaths((paths) => paths.slice(0, -1))
      },
      redo: () => {
        if (undoStack.length === 0) return

        setCurrentPaths((paths) => [...paths, ...undoStack.slice(-1)])
        setUndoStack((stack) => stack.slice(0, -1))
      },
      exportImage: () => {
        if (!stageRef.current) return Promise.resolve(null)

        return fetch(stageRef.current.toDataURL()).then((res) => res.blob())
      },
      isEmpty: () => {
        if (width <= 0 || height <= 0) return true

        const context = stageRef.current?.toCanvas()?.getContext('2d')
        if (!context) return true

        const pixelBuffer = new Uint32Array(
          context.getImageData(0, 0, width, height).data.buffer,
        )

        return !pixelBuffer.some((color) => color !== 0xffffffff)
      },
    }))

    return (
      <Stage
        ref={stageRef}
        className={className}
        width={width}
        height={height}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseup={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchStart={onMouseDown}
        onTouchMove={onMouseMove}
        onTouchEnd={onMouseUp}
      >
        <Layer>
          <Rect width={width} height={height} fill={colors.white} />
        </Layer>
        <Layer>
          {currentPaths.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke={line.strokeColor}
              strokeWidth={line.strokeWidth}
              tension={0.5}
              lineCap="round"
              lineJoin="round"
              globalCompositeOperation={
                line.tool === 'eraser' ? 'destination-out' : 'source-over'
              }
            />
          ))}
        </Layer>
      </Stage>
    )
  },
)
