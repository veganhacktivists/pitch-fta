import React from 'react'

export const InputError = ({
  message,
  className = '',
}: {
  message: string
  className?: string
}) => {
  return message ? (
    <p className={`nes-text is-error mt-2 ${className}`}>{message}</p>
  ) : null
}
