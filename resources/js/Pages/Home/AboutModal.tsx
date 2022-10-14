import React from 'react'
import { Modal } from '@/Components/Modal'
import { PrimaryButton } from '@/Components/Forms/PrimaryButton'

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
            Welcome to the app! This app was built by the Vegan Hacktivists team
            in order to collect app ideas from others in the animal rights
            movement.
          </p>
          <p>
            Using this app, you can vote on ideas and submit ideas of your own.
            There's a twist, however! If you want to stack the odds in your
            favor, you can complete certain tasks and collect badges which will
            earn you more votes.
          </p>
        </div>

        <PrimaryButton className="w-full" onClick={() => setIsOpen(false)}>
          Continue
        </PrimaryButton>
      </div>
    </Modal>
  )
}
