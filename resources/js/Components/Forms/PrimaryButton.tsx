import React from 'react'
import classNames from 'classnames'
import { InertiaLinkProps, Link } from '@inertiajs/inertia-react'

interface PrimaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  className,
  disabled,
  ...props
}) => {
  return (
    <button
      className={classNames(
        'nes-btn ml-1 mr-0',
        {
          'is-success': !disabled,
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

export const PrimaryButtonLink: React.FC<InertiaLinkProps> = ({
  className,
  ...props
}) => {
  return (
    <Link className={classNames('nes-btn is-success', className)} {...props} />
  )
}
