import React from 'react'
import classNames from 'classnames'
import { InertiaLinkProps, Link } from '@inertiajs/inertia-react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button: React.FC<ButtonProps> = ({
  className,
  disabled,
  ...props
}) => {
  return (
    <button
      className={classNames(
        'nes-btn',
        {
          'is-disabled': disabled,
        },
        className,
      )}
      disabled={disabled}
      {...props}
    />
  )
}

interface ExternalLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  isExternal: true
}

interface InternalLinkProps extends InertiaLinkProps {
  isExternal?: false
}

export type ButtonLinkProps = ExternalLinkProps | InternalLinkProps

export const ButtonLink: React.FC<ButtonLinkProps> = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  if (props.isExternal) {
    const { className, ...rest } = props
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    return <a className={classNames('nes-btn', className)} {...rest} />
  }

  const { className, ...rest } = props
  return <Link className={classNames('nes-btn', className)} {...rest} />
}
