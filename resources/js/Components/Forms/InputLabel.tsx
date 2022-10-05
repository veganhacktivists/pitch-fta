import React from 'react'
import classNames from 'classnames'

export const InputLabel: React.FC<
  React.LabelHTMLAttributes<HTMLLabelElement>
> = ({ htmlFor, className, ...props }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={classNames('mb-2 text-white', className)}
      {...props}
    />
  )
}
