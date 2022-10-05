import React, { useCallback } from 'react'
import classNames from 'classnames'
import TextareaAutosize, {
  TextareaAutosizeProps,
} from 'react-textarea-autosize'

interface TextInputProps extends TextareaAutosizeProps {
  className?: string
  setData: (name: string, value: any) => void
}

export const TextArea: React.FC<TextInputProps> = ({
  setData,
  onChange: customOnChange,
  className,
  ...props
}) => {
  const onChange = useCallback<React.ChangeEventHandler<HTMLTextAreaElement>>(
    (event) => {
      if (customOnChange) customOnChange(event)
      setData(event.target.name, event.target.value)
    },
    [customOnChange, setData],
  )

  return (
    <TextareaAutosize
      onChange={onChange}
      className={classNames(
        'nes-textarea is-dark m-0 resize-none [border-image-outset:1]',
        className,
      )}
      {...props}
    />
  )
}
