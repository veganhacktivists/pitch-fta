import React from 'react'
import classNames from 'classnames'

export const FormField: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  return <div className={classNames('nes-field', className)} {...props} />
}
