import React from 'react'
import { useLongPress } from 'use-long-press'
import { Head, useForm } from '@inertiajs/inertia-react'
import { Idea } from '@/Types'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { useToggleState } from '@/Hooks/useToggleState'
import useRoute from '@/Hooks/useRoute'
import useTypedPage from '@/Hooks/useTypedPage'
import { Navbar } from '@/Components/Navbar'
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

  const {
    isToggled: isCreateModalOpen,
    setIsToggled: setIsCreateModalOpen,
    toggle: toggleCreateModal,
  } = useToggleState(isModalOpen)

  const route = useRoute()
  const { post, data, setData } = useForm({
    ideaId: 0,
  })

  const onVote = useLongPress(
    () => {
      if (data.ideaId !== 0) {
        post(route('ideas.vote', data.ideaId))
      }
    },
    {
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
    <AuthenticatedLayout>
      <Head title="Ideas" />
      <Navbar backRoute="home">
        <button onClick={toggleCreateModal}>Submit idea</button>
      </Navbar>
      {message && <div>{message}</div>}
      <div className="h-full overflow-auto">
        <ul>
          {ideas.map((idea) => (
            <li key={idea.id}>
              {user.num_votes > 0 ? (
                <button {...onVote(idea.id)}>{idea.text}</button>
              ) : (
                idea.text
              )}
            </li>
          ))}
        </ul>
      </div>
      <CreateModal
        isOpen={isCreateModalOpen}
        setIsOpen={setIsCreateModalOpen}
      />
    </AuthenticatedLayout>
  )
}

export default IdeasIndexPage
