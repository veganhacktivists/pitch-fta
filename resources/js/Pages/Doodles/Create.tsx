import { Head, useForm } from '@inertiajs/inertia-react'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import colors from 'tailwindcss/colors'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Navbar } from '@/Components/Navbar'
import useRoute from '@/Hooks/useRoute'
import { PrimaryButton } from '@/Components/PrimaryButton'
import { SketchCanvas, SketchCanvasRef } from '@/Components/SketchCanvas'

const CANVAS_PADDING = 10

enum StrokeWidth {
  Pixel = 1,
  Small = 2,
  Medium = 4,
  Large = 8,
}

const DoodlesCreatePage = () => {
  const route = useRoute()
  const { post, data, setData } = useForm<{ doodle: Blob | null }>({
    doodle: null,
  })

  const canvasContainerRef = useRef<HTMLDivElement>(null)
  const canvas = useRef<SketchCanvasRef>(null)
  const [canvasSize, setCanvasSize] = useState({ height: 0, width: 0 })
  const [strokeColor, setStrokeColor] = useState<string>(colors.gray[900])
  const [strokeWidth, setStrokeWidth] = useState<StrokeWidth>(
    StrokeWidth.Medium,
  )

  const onSubmitDoodle = useCallback<React.FormEventHandler<HTMLFormElement>>(
    async (e) => {
      e.preventDefault()
      if (!canvas.current) return

      const doodle = await canvas.current.exportImage()
      if (!doodle) return

      setData({ doodle: new Blob([doodle], { type: 'image/png' }) })
    },
    [setData],
  )

  useEffect(() => {
    if (!data.doodle) return

    post(route('doodles.store'), {
      forceFormData: true,
      onFinish() {
        setData({ doodle: null })
      },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  useEffect(() => {
    const onResize = () => {
      if (!canvasContainerRef.current) return

      const { width, height } =
        canvasContainerRef.current.getBoundingClientRect()

      const maxWidth = height * 2
      const maxHeight = width / 2

      setCanvasSize({
        height: Math.min(height, maxHeight) - CANVAS_PADDING,
        width: Math.min(width, maxWidth) - CANVAS_PADDING,
      })
    }

    onResize()

    window.addEventListener('resize', onResize)

    return () => window.removeEventListener('resize', onResize)
  }, [])

  const onChangeStrokeColor = useCallback((color: string) => {
    setStrokeColor(color)
    canvas.current?.eraseMode(false)
  }, [])

  const onPickColor = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      setStrokeColor(e.target.value)
    },
    [],
  )

  return (
    <AuthenticatedLayout>
      <Head title="New Doodle" />
      <form onSubmit={onSubmitDoodle} className="flex h-full flex-col">
        <Navbar backRoute="doodles.index">
          <PrimaryButton type="submit">Submit</PrimaryButton>
        </Navbar>

        <div className="flex h-full w-full justify-center">
          <div className="grid w-24 grid-cols-2 content-start justify-around gap-2 p-2">
            <button
              className="grid aspect-square w-full place-items-center rounded-full border border-gray-500 bg-white"
              type="button"
              onClick={() => setStrokeWidth(StrokeWidth.Pixel)}
            >
              <span className="inline-block h-1 w-1 rounded-full bg-gray-900">
                <span className="sr-only">Pixel</span>
              </span>
            </button>
            <button
              className="grid aspect-square w-full place-items-center rounded-full border border-gray-500 bg-white"
              type="button"
              onClick={() => setStrokeWidth(StrokeWidth.Small)}
            >
              <span className="inline-block h-2 w-2 rounded-full bg-gray-900">
                <span className="sr-only">Small</span>
              </span>
            </button>
            <button
              className="grid aspect-square w-full place-items-center rounded-full border border-gray-500 bg-white"
              type="button"
              onClick={() => setStrokeWidth(StrokeWidth.Medium)}
            >
              <span className="inline-block h-3 w-3 rounded-full bg-gray-900">
                <span className="sr-only">Medium</span>
              </span>
            </button>
            <button
              className="grid aspect-square w-full place-items-center rounded-full border border-gray-500 bg-white"
              type="button"
              onClick={() => setStrokeWidth(StrokeWidth.Large)}
            >
              <span className="inline-block h-4 w-4 rounded-full bg-gray-900">
                <span className="sr-only">Large</span>
              </span>
            </button>
            <button
              className="aspect-square w-full rounded-full border border-gray-500 bg-white"
              type="button"
              onClick={() => canvas.current?.undo()}
            >
              &lt;
            </button>
            <button
              className="aspect-square w-full rounded-full border border-gray-500 bg-white"
              type="button"
              onClick={() => canvas.current?.redo()}
            >
              &gt;
            </button>
            <button
              className="aspect-square w-full rounded-full border border-gray-500 bg-white"
              type="button"
              onClick={() => canvas.current?.eraseMode(true)}
            >
              E
            </button>
            <button
              className="aspect-square w-full rounded-full border border-gray-500 bg-white"
              type="button"
              onClick={() => canvas.current?.clearCanvas()}
            >
              C
            </button>
          </div>
          <div className="relative h-full w-full" ref={canvasContainerRef}>
            <div className="absolute inset-0 text-center">
              <div className="inline-block border border-gray-900">
                <SketchCanvas
                  ref={canvas}
                  width={canvasSize.width}
                  height={canvasSize.height}
                  strokeWidth={strokeWidth}
                  strokeColor={strokeColor}
                />
              </div>
            </div>
          </div>
          <div className="grid w-24 grid-cols-2 content-start justify-around gap-2 p-2">
            <button
              type="button"
              className="aspect-square w-full rounded-full border border-gray-500 bg-gray-900"
              onClick={() => onChangeStrokeColor(colors.gray[900])}
            >
              <span className="sr-only">Black</span>
            </button>
            <button
              type="button"
              className="aspect-square w-full rounded-full border border-gray-500 bg-white"
              onClick={() => onChangeStrokeColor(colors.white)}
            >
              <span className="sr-only">White</span>
            </button>
            <button
              type="button"
              className="aspect-square w-full rounded-full border border-red-700 bg-red-500"
              onClick={() => onChangeStrokeColor(colors.red[500])}
            >
              <span className="sr-only">Red</span>
            </button>
            <button
              type="button"
              className="aspect-square w-full rounded-full border border-pink-700 bg-pink-500"
              onClick={() => onChangeStrokeColor(colors.pink[500])}
            >
              <span className="sr-only">Pink</span>
            </button>
            <button
              type="button"
              className="aspect-square w-full rounded-full border border-orange-700 bg-orange-500"
              onClick={() => onChangeStrokeColor(colors.orange[500])}
            >
              <span className="sr-only">Orange</span>
            </button>
            <button
              type="button"
              className="aspect-square w-full rounded-full border border-yellow-700 bg-yellow-500"
              onClick={() => onChangeStrokeColor(colors.yellow[500])}
            >
              <span className="sr-only">Yellow</span>
            </button>
            <button
              type="button"
              className="aspect-square w-full rounded-full border border-green-700 bg-green-500"
              onClick={() => onChangeStrokeColor(colors.green[500])}
            >
              <span className="sr-only">Green</span>
            </button>
            <button
              type="button"
              className="aspect-square w-full rounded-full border border-blue-700 bg-blue-500"
              onClick={() => onChangeStrokeColor(colors.blue[500])}
            >
              <span className="sr-only">Blue</span>
            </button>
            <button
              type="button"
              className="aspect-square w-full rounded-full border border-indigo-700 bg-indigo-500"
              onClick={() => onChangeStrokeColor(colors.indigo[500])}
            >
              <span className="sr-only">Indigo</span>
            </button>
            <button
              type="button"
              className="aspect-square w-full rounded-full border border-violet-700 bg-violet-500"
              onClick={() => onChangeStrokeColor(colors.violet[500])}
            >
              <span className="sr-only">Violet</span>
            </button>
            <button
              type="button"
              className="aspect-square w-full rounded-full border border-yellow-700 bg-yellow-800"
              onClick={() => onChangeStrokeColor(colors.yellow[800])}
            >
              <span className="sr-only">Brown</span>
            </button>
            <button
              type="button"
              className="aspect-square w-full rounded-full border border-gray-700 bg-gray-400"
              onClick={() => onChangeStrokeColor(colors.gray[400])}
            >
              <span className="sr-only">Gray</span>
            </button>
            <label
              className="col-span-2 h-6 w-full rounded-full "
              style={{ backgroundColor: strokeColor }}
            >
              <input className=" hidden " type="color" onChange={onPickColor} />
            </label>
          </div>
        </div>
      </form>
    </AuthenticatedLayout>
  )
}

export default DoodlesCreatePage
