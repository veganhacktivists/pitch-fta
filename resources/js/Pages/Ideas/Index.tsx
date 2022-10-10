import React, { useCallback, useEffect, useState } from 'react'
import classNames from 'classnames'
import { Head } from '@inertiajs/inertia-react'
import { Idea } from '@/Types'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { useToggleState } from '@/Hooks/useToggleState'
import useTypedPage from '@/Hooks/useTypedPage'
import { CreateModal } from './CreateModal'
import { VoteModal } from './VoteModal'
import { useDismissable } from '@/Hooks/useDismissable'
import { IdeaSection } from './IdeaSection'
import { Button } from '@/Components/Forms/Button'

const DISMISSABLE_KEY_INSTRUCTIONS = 'ideas.instructions.dismissed'

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

  const [ideaIdToVoteOn, setIdeaIdToVoteOn] = useState<number | null>(null)
  const {
    isToggled: shouldShowInstructions,
    toggle: toggleInstructions,
    setIsToggled: setShouldShowInstructions,
  } = useToggleState(false)
  const [areInstructionsDismissed, dismissInstructions] = useDismissable(
    DISMISSABLE_KEY_INSTRUCTIONS,
  )

  useEffect(() => {
    setAlert(message)
  }, [ideas.length, message])

  useEffect(() => {
    if (isCreateModalOpen) {
      setShouldShowInstructions(false)
      dismissInstructions()
    }
  }, [dismissInstructions, isCreateModalOpen, setShouldShowInstructions])

  const onDismissAlert = useCallback(() => {
    setAlert('')
  }, [])

  const onCloseVoteModal = useCallback(() => {
    setIdeaIdToVoteOn(null)
  }, [])

  const onDismissInstructions = useCallback(() => {
    setShouldShowInstructions(false)
    dismissInstructions()
  }, [dismissInstructions, setShouldShowInstructions])

  return (
    <AuthenticatedLayout
      backRoute="home"
      renderNav={() => <button onClick={toggleCreateModal}>New</button>}
    >
      <Head title="Ideas" />
      <div
        className={classNames('h-full items-center', {
          flex: !areInstructionsDismissed || shouldShowInstructions,
          hidden: areInstructionsDismissed && !shouldShowInstructions,
        })}
      >
        <div className="nes-container is-rounded is-dark with-title">
          <h2 className="title">
            {areInstructionsDismissed ? 'Help' : 'Hey there!'}
          </h2>
          <p className="text-sm">
            {!areInstructionsDismissed && 'You look new around here. '}
            This is where you get to submit your awesome idea(s) for the next
            project that the Vegan Hacktivists team will work on. In order to
            submit an idea, click "New" in the top-right corner. If you'd like
            to vote on an idea, simply click on the idea. Choose wisely,
            however; your votes are limited!
          </p>

          <Button onClick={onDismissInstructions} className="mt-4">
            Continue
          </Button>
        </div>
      </div>
      <div
        className={
          !areInstructionsDismissed || shouldShowInstructions
            ? 'hidden'
            : 'flex h-full flex-col'
        }
      >
        <IdeaSection
          alert={alert}
          ideas={ideas}
          onClickIdea={setIdeaIdToVoteOn}
          onDismissAlert={onDismissAlert}
          toggleCreateModal={toggleCreateModal}
          user={user}
        />
        <div className="fixed bottom-2 left-2 w-12">
          <Button onClick={toggleInstructions}>?</Button>
        </div>
      </div>
      <CreateModal
        isOpen={isCreateModalOpen}
        setIsOpen={setIsCreateModalOpen}
      />
      {ideaIdToVoteOn && (
        <VoteModal ideaId={ideaIdToVoteOn} onClose={onCloseVoteModal} />
      )}
    </AuthenticatedLayout>
  )
}

export default IdeasIndexPage
