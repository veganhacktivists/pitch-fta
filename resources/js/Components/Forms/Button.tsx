import React from 'react'
import classNames from 'classnames'
import { InertiaLinkProps, Link } from '@inertiajs/inertia-react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  disabled,
  ...props
}) => {
  return (
    <button
      className={classNames(
        'nes-btn ml-1 mr-0 w-[calc(100%-8px)] bg-white',
        {
          'is-disabled': disabled,
        },
        className,
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

export const ButtonLink: React.FC<InertiaLinkProps> = ({
  className,
  ...props
}) => {
  return <Link className={classNames('nes-btn', className)} {...props} />
}
