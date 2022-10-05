import React, { useCallback, useEffect, useState } from 'react'
import classNames from 'classnames'
import { useLongPress } from 'use-long-press'
import { Head, useForm } from '@inertiajs/inertia-react'
import { Idea } from '@/Types'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { useToggleState } from '@/Hooks/useToggleState'
import useRoute from '@/Hooks/useRoute'
import useTypedPage from '@/Hooks/useTypedPage'
import { CreateModal } from './CreateModal'

interface IdeasIndexPageProps {
  ideas: Idea[]
  isCreateModalOpen?: boolean
}

const IdeasIndexPage: React.FC<IdeasIndexPageProps> = ({
  ideas,
  isCreateModalOpen: isModalOpen = false,
}) => {
  const {
    props: {
      auth: { user },
      flash: { message },
    },
  } = useTypedPage()

  const [alert, setAlert] = useState(message)
  const {
    isToggled: isCreateModalOpen,
    setIsToggled: setIsCreateModalOpen,
    toggle: toggleCreateModal,
  } = useToggleState(isModalOpen)

  const route = useRoute()
  const { post, data, setData } = useForm({
    ideaId: 0,
  })

  useEffect(() => {
    setAlert(message)
  }, [ideas.length, message])

  const onDismissAlert = useCallback(() => {
    setAlert('')
  }, [])

  const onVote = useLongPress(
    () => {
      if (data.ideaId !== 0) {
        post(route('ideas.vote', data.ideaId))
      }
    },
    {
      cancelOnMovement: true,
      onStart(e, { context }) {
        if (!(e.target instanceof HTMLElement)) return
        if (!(typeof context === 'number')) return

        setData({
          ideaId: context,
        })
      },
      onFinish() {
        setData({
          ideaId: 0,
        })
      },
    },
  )

  return (
    <AuthenticatedLayout
      backRoute="home"
      renderNav={() => <button onClick={toggleCreateModal}>New</button>}
    >
      <Head title="Ideas" />
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
            You have {user.num_votes} vote{user.num_votes === 1 ? '' : 's'}{' '}
            left.
          </p>
        </div>
      )}

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
              {...onVote(idea.id)}
            >
              <div className={`nes-balloon from-${alignment}`}>
                <p>{idea.text}</p>

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
      <CreateModal
        isOpen={isCreateModalOpen}
        setIsOpen={setIsCreateModalOpen}
      />
    </AuthenticatedLayout>
  )
}

export default IdeasIndexPage
