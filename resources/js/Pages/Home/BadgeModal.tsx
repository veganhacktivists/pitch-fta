import React from 'react'
import { Modal } from '@/Components/Modal'
import useTypedPage from '@/Hooks/useTypedPage'
import { PrimaryButton } from '@/Components/Forms/PrimaryButton'
import { Badge } from '@/Types'
import { didBadgeTask, getBadgeProgress } from '@/Util/badges'
import classNames from 'classnames'

interface BadgeModalProps {
  badge: Badge | null
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export const BadgeModal: React.FC<BadgeModalProps> = ({
  badge,
  isOpen,
  setIsOpen,
}) => {
  const {
    props: {
      auth: { user },
    },
  } = useTypedPage()

  const numCompletedTasks = getBadgeProgress(user, badge)

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="flex flex-col gap-4 text-white">
        <h2 className="text-sm">{badge?.title}</h2>
        <div className="flex items-center gap-4">
          <img
            src={badge?.icon_path}
            alt={badge?.title}
            className="w-1/5 max-w-[64px]"
          />
          <p>{badge?.description}</p>
        </div>
        {badge && badge.tasks.length > 1 && (
          <>
            <hr />
            {badge.tasks.map((badgeTask) => (
              <div
                className={classNames(
                  'flex items-center gap-4',
                  !didBadgeTask(user, badgeTask) && 'opacity-50',
                )}
              >
                <img
                  src={badgeTask.icon_path}
                  alt={badgeTask.title}
                  className="w-1/5 max-w-[64px]"
                />
                <p>{badgeTask.title}</p>
              </div>
            ))}
            {numCompletedTasks > 0 && (
              <>
                <hr />
                <progress
                  className="nes-progress is-success"
                  value={numCompletedTasks}
                  max={badge.tasks.length}
                />
              </>
            )}
          </>
        )}
        <PrimaryButton onClick={() => setIsOpen(false)}>Continue</PrimaryButton>
      </div>
    </Modal>
  )
}
