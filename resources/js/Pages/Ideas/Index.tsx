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
import { PrimaryButton } from '@/Components/Forms/PrimaryButton'

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

  const [isVoteModalOpen, setIsVoteModalOpen] = useState(false)
  const [ideaToVoteOn, setIdeaToVoteOn] = useState<Idea | null>(null)
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

  const onClickIdea = useCallback((idea: Idea) => {
    setIdeaToVoteOn(idea)
    setIsVoteModalOpen(true)
  }, [])

  const onDismissAlert = useCallback(() => {
    setAlert('')
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
          <div className="flex flex-col gap-4">
            <p className="text-sm">
              {!areInstructionsDismissed && 'You look new around here. '}
              This is where you get to vote on awesome ideas and submit your
              own.
            </p>
            <p className="text-sm">
              To post an idea, tap "New" in the top-right corner. To cast votes
              for an idea, tap on it. Choose wisely, your votes are limited and
              final!
            </p>

            <PrimaryButton onClick={onDismissInstructions} className="w-full">
              Continue
            </PrimaryButton>
          </div>
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
          onClickIdea={onClickIdea}
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
      <VoteModal
        isOpen={isVoteModalOpen}
        idea={ideaToVoteOn}
        setIsOpen={setIsVoteModalOpen}
      />
    </AuthenticatedLayout>
  )
}

export default IdeasIndexPage
