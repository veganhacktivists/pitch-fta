import classNames from 'classnames'
import React from 'react'

interface RadioButtonProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const RadioButton: React.FC<RadioButtonProps> = ({
  className,
  type,
  ...props
}) => {
  return (
    <input
      type="radio"
      className={classNames('nes-radio is-dark mr-0 h-0 w-0', className)}
      {...props}
    />
  )
}
