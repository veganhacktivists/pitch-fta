import React, { useCallback } from 'react'

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  setData: (name: string, value: any) => void
}

export const TextInput: React.FC<TextInputProps> = ({ setData, ...props }) => {
  const onChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      setData(event.target.name, event.target.value)
    },
    [setData],
  )

  return <input type="text" onChange={onChange} {...props} />
}
