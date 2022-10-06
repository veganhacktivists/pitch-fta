import React, { useCallback } from 'react'
import { Modal } from '@/Components/Modal'
import useRoute from '@/Hooks/useRoute'
import useTypedPage from '@/Hooks/useTypedPage'
import { PrimaryButton } from '@/Components/Forms/PrimaryButton'

interface ShareModalProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const {
    props: {
      auth: { user },
    },
  } = useTypedPage()
  const route = useRoute()

  const copyLink = useCallback(() => {
    navigator.clipboard.writeText(
      route('register', {
        referrer: user.referral_code,
      }),
    )
  }, [route, user.referral_code])

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <p className="text-sm text-white">
        Please share this app with other conference attendees! If someone signs
        up using your referral link, you will receive 10 votes!
      </p>
      <PrimaryButton className="mt-4" onClick={copyLink}>
        Copy referral link
      </PrimaryButton>
    </Modal>
  )
}
