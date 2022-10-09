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
      flash: { message, badge, badgeTask, progress },
    },
  } = useTypedPage()
  const route = useRoute()
  const { post, processing, error } = useForm()

  const {
    isToggled: isConfirmationModalOpen,
    setIsToggled: setIsConfirmationModalOpen,
    toggle: toggleConfirmationModal,
  } = useToggleState(false)
  const [qrData, setQrData] = useState('')
  const scanner = useRef<QRCodeScannerRef>(null)

  useEffect(() => {
    if (!qrData) return

    post(route('scan.submit', qrData), {
      onStart() {
        scanner.current?.pause()
      },
      onSuccess() {
        setQrData('')
        setIsConfirmationModalOpen(true)
      },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message, qrData])

  useEffect(() => {
    if (!isConfirmationModalOpen) {
      scanner.current?.resume()
    }
  }, [isConfirmationModalOpen])

  const onScanSuccess = useCallback(({ data }: QRCodeScannerResult) => {
    try {
      const url = new URL(data)

      const [, path, scanId] = url.pathname.split('/')

      if (path === 'scan' && scanId.match(/^[\d\w]{4}$/i)) {
        setQrData(scanId)
      } else {
        // invalid QR code
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
        isOpen={isConfirmationModalOpen}
        setIsOpen={setIsConfirmationModalOpen}
      >
        <div className="flex flex-col gap-4 text-white">
          {message && <p>{message}</p>}
          {badgeTask?.completion_message && (
            <div className="flex items-center gap-3">
              <img
                src={badgeTask.icon_path}
                alt={badgeTask.title}
                className="w-1/5 max-w-[64px]"
              />
              <p>{badgeTask.completion_message}</p>
            </div>
          )}
          {progress && (
            <>
              <p>
                You're one step closer towards getting "{badgeTask?.badge.title}
                !"
              </p>
              <progress
                className="nes-progress is-success"
                value={progress}
                max={badgeTask?.badge.tasks.length}
              />
            </>
          )}
          {badge?.completion_message && (
            <>
              <hr />
              <h2 className="text-sm">New badge earned: {badge.title}</h2>
              <div>
                <div className="flex items-center gap-3">
                  <img
                    src={badge.icon_path}
                    alt={badge.title}
                    className="w-1/5 max-w-[64px]"
                  />
                  <p>{badge.completion_message}</p>
                </div>
              </div>
            </>
          )}

          <PrimaryButton onClick={toggleConfirmationModal}>
            Continue
          </PrimaryButton>
        </div>
      </Modal>
    </AuthenticatedLayout>
  )
}

export default ScanQRCodePage
