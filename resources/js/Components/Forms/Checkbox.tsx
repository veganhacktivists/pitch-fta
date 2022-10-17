import classNames from 'classnames'
import React from 'react'

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Checkbox: React.FC<CheckboxProps> = ({
  className,
  type,
  ...props
}) => {
  return (
    <input
      type="checkbox"
      className={classNames('nes-checkbox is-dark h-0 w-0', className)}
      {...props}
    />
  )
}
