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
    if (isFullScreen) {
      const onResize = () => {
        const appContainer = document.getElementById('app-container')

        setHeight(
          appContainer instanceof HTMLElement
            ? appContainer.clientHeight
            : window.innerHeight,
        )
        setWidth(
          appContainer instanceof HTMLElement
            ? appContainer.clientWidth
            : window.innerWidth,
        )
      }

      onResize()
      window.addEventListener('resize', onResize)
      window.addEventListener('orientationchange', onResize)

      return () => {
        window.removeEventListener('resize', onResize)
        window.removeEventListener('orientationchange', onResize)
      }
    }

    if (ref.current) {
      const resizeObserver = new ResizeObserver(([el]) => {
        setHeight(el.contentRect.height)
        setWidth(el.contentRect.width)
      })

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
