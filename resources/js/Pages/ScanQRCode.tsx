import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useForm } from '@inertiajs/inertia-react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import {
  QRCodeScanner,
  QRCodeScannerRef,
  QRCodeScannerResult,
} from '@/Components/QRCodeScanner'
import useRoute from '@/Hooks/useRoute'
import useTypedPage from '@/Hooks/useTypedPage'
import { SizeWatcher } from '@/Components/SizeWatcher'
import { Modal } from '@/Components/Modal'
import { PrimaryButton } from '@/Components/Forms/PrimaryButton'
import { useToggleState } from '@/Hooks/useToggleState'

const ScanQRCodePage = () => {
  const {
    props: {
      flash: { badge, badgeTask },
    },
  } = useTypedPage()
  const route = useRoute()
  const { post, processing } = useForm()

  const {
    isToggled: isStatusModalOpen,
    setIsToggled: setIsStatusModalOpen,
    toggle: toggleStatusModal,
  } = useToggleState(false)

  const [message, setMessage] = useState('')
  const [isInvalidQRCode, setIsInvalidQRCode] = useState(false)
  const [qrData, setQrData] = useState('')
  const scanner = useRef<QRCodeScannerRef>(null)

  useEffect(() => {
    const onBadgeObtainedModalClosed = () => {
      scanner.current?.resume()
    }

    window.addEventListener(
      'badgeObtainedModalClosed',
      onBadgeObtainedModalClosed,
    )

    return () => {
      window.removeEventListener(
        'badgeObtainedModalClosed',
        onBadgeObtainedModalClosed,
      )
    }
  }, [])

  useEffect(() => {
    if (!qrData) return

    post(route('scan.submit', qrData), {
      onStart() {
        scanner.current?.pause()
      },
      onSuccess({
        props: {
          flash: { message: m },
        },
      }: // eslint-disable-next-line @typescript-eslint/no-explicit-any
      any) {
        setQrData('')
        setMessage(m)
      },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qrData])

  useEffect(() => {
    setIsStatusModalOpen(isInvalidQRCode)
  }, [isInvalidQRCode, setIsStatusModalOpen])

  useEffect(() => {
    if (badge || badgeTask) {
      setIsStatusModalOpen(false)
    } else if (message) {
      setIsStatusModalOpen(true)
    }
  }, [badge, badgeTask, message, setIsStatusModalOpen])

  useEffect(() => {
    if (!isStatusModalOpen) {
      setIsInvalidQRCode(false)
      scanner.current?.resume()
    }
  }, [isStatusModalOpen])

  const onScanSuccess = useCallback(({ data }: QRCodeScannerResult) => {
    try {
      const url = new URL(data)

      const [, path, scanId] = url.pathname.split('/')

      if (path === 'scan' && scanId.match(/^[\d\w]{4}$/i)) {
        setQrData(scanId)
      } else {
        setIsInvalidQRCode(true)
      }
    } catch (e) {
      // swallow
    }
  }, [])

  return (
    <AuthenticatedLayout backRoute="home">
      <SizeWatcher className="h-full w-full">
        {({ width, height }) => (
          <QRCodeScanner
            ref={scanner}
            onSuccess={onScanSuccess}
            width={width}
            height={height}
          />
        )}
      </SizeWatcher>
      <Modal
        isOpen={processing || isStatusModalOpen}
        setIsOpen={setIsStatusModalOpen}
        afterLeave={() => {
          setMessage('')
        }}
      >
        <div className="flex flex-col gap-4 text-white">
          {processing && <p className="text-white">Scanning...</p>}
          {isInvalidQRCode && (
            <p className="text-white">
              It looks like you've scanned an invalid QR Code. Try again!
            </p>
          )}
          {message && <p>{message}</p>}
          <PrimaryButton onClick={toggleStatusModal}>Continue</PrimaryButton>
        </div>
      </Modal>
    </AuthenticatedLayout>
  )
}

export default ScanQRCodePage
