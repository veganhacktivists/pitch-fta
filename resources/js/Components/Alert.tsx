import React, { useCallback, useEffect, useState } from 'react'
import useTypedPage from '@/Hooks/useTypedPage'

interface AlertProps {
  observable: any
}

export const Alert: React.FC<AlertProps> = ({ observable }) => {
  const {
    props: {
      flash: { message },
    },
  } = useTypedPage()

  const [alert, setAlert] = useState(message)
  const onDismissAlert = useCallback(() => {
    setAlert('')
  }, [])

  useEffect(() => {
    setAlert(message)
  }, [observable, message])

  return alert ? (
    <div className="nes-container is-rounded is-dark relative flex items-center text-center">
      <p className="px-4">{alert}</p>
      <button className="absolute right-4" onClick={onDismissAlert}>
        <i className="nes-icon close is-small before:!text-white" />
      </button>
    </div>
  ) : null
}
