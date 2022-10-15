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

      onResize()
      window.addEventListener('resize', onResize)
      window.addEventListener('orientationchange', onResize)

      // HACK: This is to fix issues on Chrome when rotating phones
      // For some reason, innerWidth and innerHeight don't get updated
      // reliably after rotating on Chrome, so we use the outer width/height
      // if necessary. After that, the inner width/height will be updated
      // and will then take over.
      const interval = setInterval(onResize, 1000)

      return () => {
        window.removeEventListener('resize', onResize)
        window.removeEventListener('orientationchange', onResize)

        clearInterval(interval)
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
