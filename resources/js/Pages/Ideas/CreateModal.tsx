import { useForm } from '@inertiajs/inertia-react'
import React, { useCallback } from 'react'
import { TextArea } from '@/Components/Forms/TextArea'
import { InputError } from '@/Components/InputError'
import { InputLabel } from '@/Components/InputLabel'
import { Modal } from '@/Components/Modal'
import { PrimaryButton } from '@/Components/PrimaryButton'
import useRoute from '@/Hooks/useRoute'

interface CreateModalProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export const CreateModal: React.FC<CreateModalProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const route = useRoute()
  const { post, data, setData, errors, reset } = useForm({
    text: '',
  })

  const submitForm = useCallback(() => {
    post(route('ideas.store'), {
      onSuccess() {
        setIsOpen(false)
        reset()
      },
    })
  }, [post, reset, route, setIsOpen])

  const onSubmitIdea = useCallback<React.FormEventHandler<HTMLFormElement>>(
    (e) => {
      e.preventDefault()
      submitForm()
    },
    [submitForm],
  )

  const detectEnterSubmission = useCallback<
    React.KeyboardEventHandler<HTMLTextAreaElement>
  >(
    (e) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        submitForm()
      }
    },
    [submitForm],
  )
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <form onSubmit={onSubmitIdea} className="flex flex-col">
        <InputLabel htmlFor="text">Your idea</InputLabel>
        <TextArea
          name="text"
          id="text"
          value={data.text}
          setData={setData}
          maxLength={256}
          rows={1}
          onKeyDown={detectEnterSubmission}
        />
        <InputError message={errors.text} />
        <PrimaryButton type="submit">Submit</PrimaryButton>
      </form>
    </Modal>
  )
}
