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
    const [qrCodeScanner, setQrCodeScanner] = useState<Scanner | null>(null)

    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
      if (!videoRef.current) return

      const scanner = new Scanner(videoRef.current, onSuccess, {
        returnDetailedScanResult: true,
        preferredCamera: 'environment',
        onDecodeError: () => {},
      })

      setQrCodeScanner(scanner)
      scanner.start()
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
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video
          style={{ height: `${height}px`, width: `${width}px` }}
          ref={videoRef}
        />
      </>
    )
  },
)
