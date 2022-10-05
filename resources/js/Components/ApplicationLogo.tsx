import React from 'react'
import classNames from 'classnames'

interface ApplicationLogoProps {
  className?: string
}

export const ApplicationLogo: React.FC<ApplicationLogoProps> = ({
  className,
}) => {
  return <h1 className={classNames('text-white', className)}>VH</h1>
}
