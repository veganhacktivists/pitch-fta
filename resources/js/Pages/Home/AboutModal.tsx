import React from 'react'
import { Modal } from '@/Components/Modal'
import { PrimaryButton } from '@/Components/Forms/PrimaryButton'
import { ButtonLink } from '@/Components/Forms/Button'

interface AboutModalProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export const AboutModal: React.FC<AboutModalProps> = ({
  isOpen,
  setIsOpen,
}) => {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="flex flex-col gap-4">
        <div className="contents text-sm text-white">
          <p>
            Welcome! This app was built by Vegan Hacktivists to crowdsource
            innovative app ideas for the movement. You can submit ideas of your
            own and vote on your favorites.
          </p>
          <p>
            To stack the odds in your favor, you can complete in-app and live
            activities to earn badges and more importantly, earn more votes.
          </p>
        </div>

        <PrimaryButton className="w-full" onClick={() => setIsOpen(false)}>
          Got it!
        </PrimaryButton>

        <ButtonLink
          href="https://veganhacktivists.org/support"
          className="is-pink w-full"
          target="_blank"
          isExternal
        >
          Support our work
        </ButtonLink>
      </div>
    </Modal>
  )
}
