import { isMobileBrowser } from '@/Util/device'
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
    const isMobile = isMobileBrowser()

    if (isFullScreen) {
      if (appContainer) {
        appContainer.classList.add(
          'mx-auto',
          'relative',
          'flex',
          'h-screen',
          'overflow-hidden',
          'max-w-lg',
        )
      }

      const onResize = () => {
        setHeight(
          !isMobile && appContainer instanceof HTMLElement
            ? appContainer.clientHeight
            : window.innerHeight,
        )
        setWidth(
          !isMobile && appContainer instanceof HTMLElement
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
