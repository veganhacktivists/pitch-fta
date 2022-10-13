import React, { useEffect } from 'react'
import { Badge, BadgeTask } from '@/Types'
import { PrimaryButton } from './Forms/PrimaryButton'
import { Modal } from './Modal'

interface BadgeObtainedModalProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  badge?: Badge
  badgeTask?: BadgeTask
  progress?: number
}

export const BadgeObtainedModal: React.FC<BadgeObtainedModalProps> = ({
  isOpen,
  setIsOpen,
  badge,
  badgeTask,
  progress,
}) => {
  useEffect(() => {
    return () => {
      window.dispatchEvent(new Event('badgeObtainedModalClosed'))
    }
  }, [])

  useEffect(() => {
    if (!isOpen) {
      window.dispatchEvent(new Event('badgeObtainedModalClosed'))
    }
  }, [isOpen])

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="flex flex-col gap-4 text-white">
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
        {!!progress && (
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
            {(progress || badgeTask?.completion_message) && <hr />}
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

        <PrimaryButton onClick={() => setIsOpen(false)}>Continue</PrimaryButton>
      </div>
    </Modal>
  )
}
