import React from 'react'
import classNames from 'classnames'

interface ApplicationLogoProps {
  className?: string
}

export const ApplicationLogo: React.FC<ApplicationLogoProps> = ({
  className,
}) => {
  return (
    <h1 className={classNames('text-white', className)}>
      <img
        src="/sprites/logo.svg"
        alt="Vegan Hacktivists"
        className="inline-block h-12 w-12"
      />
    </h1>
  )
}
