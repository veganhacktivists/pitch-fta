import React from 'react'

export const InputLabel: React.FC<
  React.LabelHTMLAttributes<HTMLLabelElement>
> = ({ htmlFor, className, ...props }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`block font-medium text-sm text-gray-700 ${className}`}
      {...props}
    />
  )
}
