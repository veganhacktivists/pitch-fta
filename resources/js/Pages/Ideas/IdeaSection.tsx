import React from 'react'
import classNames from 'classnames'
import { Idea, User } from '@/Types'
import { PrimaryButton } from '@/Components/Forms/PrimaryButton'

interface IdeaSectionProps {
  alert?: string
  ideas: Idea[]
  onClickIdea: (ideaId: number) => void
  onDismissAlert: () => void
  toggleCreateModal: () => void
  user: User
}

export const IdeaSection: React.FC<IdeaSectionProps> = ({
  alert,
  ideas,
  onClickIdea,
  onDismissAlert,
  toggleCreateModal,
  user,
}) => (
  <>
    {alert ? (
      <div className="nes-container is-rounded is-dark relative flex items-center text-center">
        <p className="px-4">{alert}</p>
        <button className="absolute right-4" onClick={onDismissAlert}>
          <i className="nes-icon close is-small before:!text-white" />
        </button>
      </div>
    ) : (
      <div className="nes-container is-rounded is-dark text-center">
        <p>
          You have {user.num_votes} {user.num_votes === 1 ? 'vote' : 'votes'}{' '}
          left.
        </p>
      </div>
    )}

    {ideas.length <= 0 && (
      <div className="flex h-full items-center">
        <div className="nes-container is-rounded is-dark with-title">
          <h2 className="title">Hey!</h2>
          <p>
            It looks like nobody has submitted an idea yet. Want to be the
            first?
          </p>
          <PrimaryButton className="mt-4" onClick={toggleCreateModal}>
            New idea
          </PrimaryButton>
        </div>
      </div>
    )}

    {ideas.length > 0 && (
      <div className="message-list h-full overflow-auto px-3">
        {ideas.map((idea, i) => {
          const alignment = i % 2 === 0 ? 'left' : 'right'

          return (
            <button
              key={idea.id}
              className={classNames(
                `message block text-left -${alignment}`,
                alignment === 'right' && 'ml-auto',
              )}
              onClick={() => onClickIdea(idea.id)}
            >
              <div className={`nes-balloon from-${alignment}`}>
                <p className="[word-break:break-word]">{idea.text}</p>

                {idea.votes_count > 0 && (
                  <p
                    className={classNames(
                      `mt-2 flex items-center gap-1`,
                      alignment === 'right' && 'justify-end',
                    )}
                  >
                    <i className="nes-icon is-small like" />
                    {idea.votes_count}
                  </p>
                )}
              </div>
            </button>
          )
        })}
      </div>
    )}
  </>
)