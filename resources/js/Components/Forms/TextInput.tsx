import React, { forwardRef, useCallback } from 'react'
import classNames from 'classnames'

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
  name: string
  setData: (name: string, value: any) => void
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ setData, className, ...props }, ref) => {
    const onChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
      (event) => {
        setData(event.target.name, event.target.value)
      },
      [setData],
    )

    return (
      <input
        ref={ref}
        type="text"
        className={classNames('nes-input is-dark', className)}
        onChange={onChange}
        {...props}
      />
    )
  },
)
