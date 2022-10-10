import { useForm } from '@inertiajs/inertia-react'
import React, { useCallback } from 'react'
import { InputError } from '@/Components/InputError'
import { Modal } from '@/Components/Modal'
import {
  PrimaryButton,
  PrimaryButtonLink,
} from '@/Components/Forms/PrimaryButton'
import useRoute from '@/Hooks/useRoute'
import useTypedPage from '@/Hooks/useTypedPage'
import { Button } from '@/Components/Forms/Button'
import { Idea } from '@/Types'

interface VoteModalProps {
  isOpen: boolean
  idea: Idea | null
  setIsOpen: (isOpen: boolean) => void
}

export const VoteModal: React.FC<VoteModalProps> = ({
  idea,
  isOpen,
  setIsOpen,
}) => {
  const {
    props: {
      auth: { user },
    },
  } = useTypedPage()
  const route = useRoute()
  const { post, setData, data, processing, reset, errors } = useForm({
    num_votes: 1,
  })

  const submitForm = useCallback<React.FormEventHandler<HTMLFormElement>>(
    (e) => {
      e.preventDefault()
      if (idea === null) return

      post(route('ideas.vote', idea.id), {
        onSuccess() {
          setIsOpen(false)
          reset()
        },
      })
    },
    [idea, post, reset, route, setIsOpen],
  )

  const decrementNumVotes = useCallback(() => {
    setData({
      num_votes: Math.max(data.num_votes - 1, 1),
    })
  }, [data.num_votes, setData])

  const incrementNumVotes = useCallback(() => {
    setData({
      num_votes: Math.min(data.num_votes + 1, user.num_votes),
    })
  }, [data.num_votes, setData, user.num_votes])

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      {user.num_votes <= 0 && (
        <>
          <p className="text-white">
            Oh no, you've run out of votes! Earn more to secure victory for your
            favorite idea.
          </p>
          <PrimaryButtonLink href={route('home')} className="mt-4 w-full">
            Earn more votes
          </PrimaryButtonLink>
        </>
      )}
      <form onSubmit={submitForm} className="flex flex-col gap-4">
        {user.num_votes > 1 && (
          <>
            <p className="text-white">{idea?.text}</p>
            <p className="text-white">
              How many votes would you like to cast for this idea?
            </p>
            <div className="flex justify-between">
              <div>
                <Button
                  type="button"
                  className="pr-3"
                  disabled={processing || data.num_votes <= 1}
                  onClick={decrementNumVotes}
                >
                  -
                </Button>
              </div>
              <div className="grid w-full place-items-center text-white">
                {data.num_votes}
              </div>
              <div>
                <Button
                  type="button"
                  className="pr-3"
                  disabled={processing || data.num_votes >= user.num_votes}
                  onClick={incrementNumVotes}
                >
                  +
                </Button>
              </div>
            </div>
          </>
        )}
        <PrimaryButton>
          Cast {data.num_votes} {data.num_votes === 1 ? 'vote' : 'votes'}
        </PrimaryButton>

        <InputError message={errors.num_votes} />
      </form>
    </Modal>
  )
}
