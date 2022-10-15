import { Head, useForm } from '@inertiajs/inertia-react'
import classNames from 'classnames'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import colors from 'tailwindcss/colors'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import useRoute from '@/Hooks/useRoute'
import { SketchCanvas, SketchCanvasRef } from '@/Components/SketchCanvas'
import { useToggleState } from '@/Hooks/useToggleState'
import { SizeWatcher } from '@/Components/SizeWatcher'

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

  const canvas = useRef<SketchCanvasRef>(null)
  const {
    isToggled: isLandscapeAlertDismissed,
    toggle: toggleIsLandscapeAlertDismissed,
  } = useToggleState(false)
  const [isLandscape, setIsLandscape] = useState(
    window.outerWidth > window.outerHeight,
  )
  const [isEmpty, setIsEmpty] = useState(false)
  const [isErasing, setIsErasing] = useState(false)
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
    const onOrientationChange = () => {
      setIsLandscape(window.outerWidth > window.outerHeight)
    }

    onOrientationChange()

    window.addEventListener('resize', onOrientationChange)

    return () => {
      window.removeEventListener('resize', onOrientationChange)
    }
  }, [])

  const onChangeStrokeColor = useCallback((color: string) => {
    setStrokeColor(color)
    setIsErasing(false)
  }, [])

  const onChangeStrokeWidth = useCallback((width: number) => {
    setStrokeWidth(width)
    setIsErasing(false)
  }, [])

  const onPickColor = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      setStrokeColor(e.target.value)
    },
    [],
  )

  const onChangeCanvas = useCallback(() => {
    setIsEmpty(!!canvas.current?.isEmpty())
  }, [])

  return (
    <AuthenticatedLayout
      backRoute="doodles.index"
      renderNav={() =>
        !isEmpty && (
          <button type="submit" form="doodle-form">
            Submit
          </button>
        )
      }
    >
      <Head title="New Doodle" />
      <form
        onSubmit={onSubmitDoodle}
        className={classNames('h-full')}
        id="doodle-form"
      >
        {!isLandscape && !isLandscapeAlertDismissed && (
          <div className="nes-container is-rounded is-dark relative flex items-center text-center">
            <p className="px-4">Tip: Rotate your phone!</p>
            <button
              className="absolute right-4"
              onClick={toggleIsLandscapeAlertDismissed}
            >
              <i className="nes-icon close is-small before:!text-white" />
            </button>
          </div>
        )}
        <div className="flex h-full w-full items-center justify-center">
          <div className="grid w-24 grid-cols-2 content-start gap-2 p-2">
            <button
              className="rounded-2px grid aspect-square w-full place-items-center bg-white"
              type="button"
              onClick={() => onChangeStrokeWidth(StrokeWidth.Pixel)}
            >
              <span
                className="inline-block h-[3px] w-[3px] border border-gray-900 border-opacity-80"
                style={{ backgroundColor: strokeColor }}
              >
                <span className="sr-only">Pixel</span>
              </span>
            </button>
            <button
              className="rounded-2px grid aspect-square w-full place-items-center bg-white"
              type="button"
              onClick={() => onChangeStrokeWidth(StrokeWidth.Small)}
            >
              <span
                className="inline-block h-[7px] w-[7px]  border border-gray-900 border-opacity-80"
                style={{ backgroundColor: strokeColor }}
              >
                <span className="sr-only">Small</span>
              </span>
            </button>
            <button
              className="rounded-2px grid aspect-square w-full place-items-center bg-white"
              type="button"
              onClick={() => onChangeStrokeWidth(StrokeWidth.Medium)}
            >
              <span
                className="inline-block h-[9px] w-[9px] border border-gray-900 border-opacity-80"
                style={{ backgroundColor: strokeColor }}
              >
                <span className="sr-only">Medium</span>
              </span>
            </button>
            <button
              className="rounded-2px grid aspect-square w-full place-items-center bg-white"
              type="button"
              onClick={() => onChangeStrokeWidth(StrokeWidth.Large)}
            >
              <span
                className="inline-block h-[13px] w-[13px] border border-gray-900 border-opacity-80"
                style={{ backgroundColor: strokeColor }}
              >
                <span className="sr-only">Large</span>
              </span>
            </button>
            <button
              className="rounded-2px grid aspect-square w-full place-items-center bg-white"
              type="button"
              onClick={() => canvas.current?.undo()}
            >
              <img src="/sprites/undo.png" alt="Undo" />
            </button>
            <button
              className="rounded-2px grid aspect-square w-full place-items-center bg-white"
              type="button"
              onClick={() => canvas.current?.redo()}
            >
              <img src="/sprites/redo.png" alt="Redo" />
            </button>
            <button
              className={classNames(
                'rounded-2px grid aspect-square w-full place-items-center',
                {
                  'bg-white': !isErasing,
                  'bg-gray-400': isErasing,
                },
              )}
              type="button"
              onClick={() => setIsErasing(true)}
            >
              <img src="/sprites/eraser.png" alt="Eraser" />
            </button>
            <button
              className="rounded-2px grid aspect-square w-full place-items-center bg-white"
              type="button"
              onClick={() => canvas.current?.clearCanvas()}
            >
              <img src="/sprites/x.png" alt="Clear" />
            </button>
          </div>
          <SizeWatcher className="relative h-full w-full">
            {({ height, width }) => (
              <div className="absolute inset-0 flex items-center justify-center">
                <SketchCanvas
                  className="rounded-4px"
                  ref={canvas}
                  width={Math.min(width, height * 2)}
                  height={Math.min(height, width / 2) - CANVAS_PADDING}
                  strokeWidth={strokeWidth}
                  strokeColor={strokeColor}
                  isErasing={isErasing}
                  onChange={onChangeCanvas}
                />
              </div>
            )}
          </SizeWatcher>
          <div className="grid w-24 grid-cols-2 content-start justify-around gap-2 p-2">
            <button
              type="button"
              className="rounded-2px aspect-square w-full border border-gray-900 border-opacity-80 bg-gray-900"
              onClick={() => onChangeStrokeColor(colors.gray[900])}
            >
              <span className="sr-only">Black</span>
            </button>
            <button
              type="button"
              className="rounded-2px aspect-square w-full border border-gray-900 border-opacity-80 bg-white"
              onClick={() => onChangeStrokeColor(colors.white)}
            >
              <span className="sr-only">White</span>
            </button>
            <button
              type="button"
              className="rounded-2px aspect-square w-full border border-gray-900 border-opacity-80 bg-red-500"
              onClick={() => onChangeStrokeColor(colors.red[500])}
            >
              <span className="sr-only">Red</span>
            </button>
            <button
              type="button"
              className="rounded-2px aspect-square w-full border border-gray-900 border-opacity-80 bg-pink-500"
              onClick={() => onChangeStrokeColor(colors.pink[500])}
            >
              <span className="sr-only">Pink</span>
            </button>
            <button
              type="button"
              className="rounded-2px aspect-square w-full border border-gray-900 border-opacity-80 bg-orange-500"
              onClick={() => onChangeStrokeColor(colors.orange[500])}
            >
              <span className="sr-only">Orange</span>
            </button>
            <button
              type="button"
              className="rounded-2px aspect-square w-full border border-gray-900 border-opacity-80 bg-yellow-500"
              onClick={() => onChangeStrokeColor(colors.yellow[500])}
            >
              <span className="sr-only">Yellow</span>
            </button>
            <button
              type="button"
              className="rounded-2px aspect-square w-full border border-gray-900 border-opacity-80 bg-green-500"
              onClick={() => onChangeStrokeColor(colors.green[500])}
            >
              <span className="sr-only">Green</span>
            </button>
            <button
              type="button"
              className="rounded-2px aspect-square w-full border border-gray-900 border-opacity-80 bg-blue-500"
              onClick={() => onChangeStrokeColor(colors.blue[500])}
            >
              <span className="sr-only">Blue</span>
            </button>
            <button
              type="button"
              className="rounded-2px aspect-square w-full border border-gray-900 border-opacity-80 bg-indigo-500"
              onClick={() => onChangeStrokeColor(colors.indigo[500])}
            >
              <span className="sr-only">Indigo</span>
            </button>
            <button
              type="button"
              className="rounded-2px aspect-square w-full border border-gray-900 border-opacity-80 bg-violet-500"
              onClick={() => onChangeStrokeColor(colors.violet[500])}
            >
              <span className="sr-only">Violet</span>
            </button>
            <button
              type="button"
              className="rounded-2px aspect-square w-full border border-gray-900 border-opacity-80 bg-yellow-800"
              onClick={() => onChangeStrokeColor(colors.yellow[800])}
            >
              <span className="sr-only">Brown</span>
            </button>
            <button
              type="button"
              className="rounded-2px aspect-square w-full border border-gray-900 border-opacity-80 bg-gray-400"
              onClick={() => onChangeStrokeColor(colors.gray[400])}
            >
              <span className="sr-only">Gray</span>
            </button>
            <label
              className="rounded-2px col-span-2 h-6 w-full border border-gray-900 border-opacity-50"
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
