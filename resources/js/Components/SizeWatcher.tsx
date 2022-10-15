import React, { ReactNode, useEffect, useRef, useState } from 'react'

interface SizeWatcherProps {
  className?: string
  children: ({ height, width }: { height: number; width: number }) => ReactNode
  isFullScreen?: boolean
}

export const SizeWatcher: React.FC<SizeWatcherProps> = ({
  className,
  children,
  isFullScreen = false,
}) => {
  const [height, setHeight] = useState(0)
  const [width, setWidth] = useState(0)

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const appContainer = document.getElementById('app-container')

    if (isFullScreen) {
      const onResize = () => {
        setHeight(Math.min(window.innerHeight, window.outerHeight))
        setWidth(
          appContainer instanceof HTMLElement
            ? appContainer.clientWidth
            : Math.min(window.innerWidth, window.outerWidth),
        )
      }

      const onOrientationChange = () => {
        document.querySelector('.overflow-auto')?.scrollTo({
          top: 0,
        })

        // HACK: This is to fix issues on iOS when rotating phones
        setTimeout(onResize, 100)
      }

      onResize()
      window.addEventListener('resize', onResize)
      window.addEventListener('orientationchange', onResize)
      window.addEventListener('orientationchange', onOrientationChange)

      return () => {
        window.removeEventListener('resize', onResize)
        window.removeEventListener('orientationchange', onResize)
        window.removeEventListener('orientationchange', onOrientationChange)
      }
    }

    const resizeObserver = new ResizeObserver(([el]) => {
      setHeight(el.contentRect.height)
      setWidth(el.contentRect.width)
    })

    if (isFullScreen && appContainer) {
      resizeObserver.observe(appContainer)
    } else if (ref.current) {
      resizeObserver.observe(ref.current)
    }

    return () => {}
  }, [isFullScreen])

  return (
    <div className={className} ref={ref}>
      {children({ height, width })}
    </div>
  )
}
