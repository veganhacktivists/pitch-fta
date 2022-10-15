import React from 'react'
import classNames from 'classnames'
import { Button, ButtonLink, ButtonLinkProps } from './Button'

interface PrimaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  className,
  ...props
}) => {
  return <Button className={classNames('is-success', className)} {...props} />
}

export const PrimaryButtonLink: React.FC<ButtonLinkProps> = ({
  className,
  ...props
}) => {
  return (
    <ButtonLink className={classNames('is-success', className)} {...props} />
  )
}
