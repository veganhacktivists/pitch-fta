import React, { ReactNode, useEffect, useRef, useState } from 'react'

interface SizeWatcherProps {
  className?: string
  children: ({ height, width }: { height: number; width: number }) => ReactNode
}

export const SizeWatcher: React.FC<SizeWatcherProps> = ({
  className,
  children,
}) => {
  const [height, setHeight] = useState(0)
  const [width, setWidth] = useState(0)

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      const resizeObserver = new ResizeObserver(([el]) => {
        setHeight(el.contentRect.height)
        setWidth(el.contentRect.width)
      })

      resizeObserver.observe(ref.current)
    }

    return () => {}
  }, [])

  return (
    <div className={className} ref={ref}>
      {children({ height, width })}
    </div>
  )
}
