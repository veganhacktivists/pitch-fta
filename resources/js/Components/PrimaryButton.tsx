import React from 'react'

interface PrimaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  ...props
}) => {
  return <button {...props}>{children}</button>
}
