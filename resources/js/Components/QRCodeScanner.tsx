import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import Scanner from 'qr-scanner'

interface QRCodeScannerProps {
  onSuccess: (result: QRCodeScannerResult) => void
  height: number
  width: number
}

export interface QRCodeScannerRef {
  pause: () => void
  resume: () => void
}

export type QRCodeScannerResult = Scanner.ScanResult

export const QRCodeScanner = forwardRef<QRCodeScannerRef, QRCodeScannerProps>(
  ({ height, width, onSuccess }, ref) => {
    const [hasCameraPermission, setHasCameraPermission] = useState(true)
    const [qrCodeScanner, setQrCodeScanner] = useState<Scanner | null>(null)

    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
      navigator.mediaDevices?.enumerateDevices().then((devices) => {
        let hasPermission = false
        devices.forEach((device) => {
          if (device.label && device.kind === 'videoinput') {
            hasPermission = true
          }
        })
        setHasCameraPermission(hasPermission)
      })
    }, [])

    useEffect(() => {
      if (!videoRef.current) return

      const scanner = new Scanner(videoRef.current, onSuccess, {
        returnDetailedScanResult: true,
        preferredCamera: 'environment',
        onDecodeError: () => {},
      })

      setQrCodeScanner(scanner)
      scanner
        .start()
        .then(() => {
          setHasCameraPermission(true)
        })
        .catch(() => setHasCameraPermission(false))
    }, [onSuccess])

    useEffect(
      () => () => {
        qrCodeScanner?.stop()
      },
      [qrCodeScanner],
    )

    useImperativeHandle(ref, () => ({
      pause: () => {
        try {
          qrCodeScanner?.pause()
        } catch (e) {
          // swallow
        }
      },
      resume: () => {
        try {
          qrCodeScanner?.start()
        } catch (e) {
          // swallow
        }
      },
    }))

    return (
      <>
        {!hasCameraPermission && (
          <div className="flex h-full items-center">
            <div className="nes-container is-dark is-rounded with-title">
              <h2 className="title">Heads up!</h2>
              <p>To scan QR codes, you need to allow us to use your camera!</p>
            </div>
          </div>
        )}
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video
          style={{ height: `${height}px`, width: `${width}px` }}
          ref={videoRef}
        />
      </>
    )
  },
)
