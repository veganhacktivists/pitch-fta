import React from 'react'
import classNames from 'classnames'

interface ApplicationLogoProps {
  className?: string
}

export const ApplicationLogo: React.FC<ApplicationLogoProps> = ({
  className,
}) => {
  return (
    <img
      src="/sprites/logo.svg"
      alt="Vegan Hacktivists"
      className={classNames('inline-block', className)}
    />
  )
}
