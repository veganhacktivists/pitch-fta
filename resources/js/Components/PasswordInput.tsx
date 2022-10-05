import React, { useEffect, useRef } from 'react'
import { useToggleState } from '@/Hooks/useToggleState'
import { TextInput } from './Forms/TextInput'

interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string
  setData: (name: string, value: any) => void
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  setData,
  autoFocus,
  ...props
}) => {
  const { isToggled: isText, toggle: toggleIsText } = useToggleState(false)

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (autoFocus) {
      inputRef.current?.focus()
    }
  }, [autoFocus, isText])

  return (
    <div className="relative flex items-center">
      <TextInput
        ref={inputRef}
        type={isText ? 'text' : 'password'}
        setData={setData}
        inputMode="numeric"
        required
        minLength={4}
        maxLength={4}
        pattern="[0-9]{4}"
        {...props}
      />

      <button
        className="absolute right-0 h-full p-4 uppercase"
        onClick={toggleIsText}
        type="button"
      >
        {isText ? 'Hide' : 'Show'}
      </button>
    </div>
  )
}
