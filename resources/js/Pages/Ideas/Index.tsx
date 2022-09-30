import React, { useCallback } from 'react'
import { useForm } from '@inertiajs/inertia-react'
import { Idea } from '@/Types'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Modal } from '@/Components/Modal'
import { useToggleState } from '@/Hooks/useToggleState'
import { InputLabel } from '@/Components/InputLabel'
import useRoute from '@/Hooks/useRoute'
import { PrimaryButton } from '@/Components/PrimaryButton'
import { TextArea } from '@/Components/Forms/TextArea'
import { InputError } from '@/Components/InputError'
import useTypedPage from '@/Hooks/useTypedPage'
import { Navbar } from '@/Components/Navbar'

interface IdeasIndexPageProps {
  ideas: Idea[]
  isCreateModalOpen?: boolean
}

const IdeasIndexPage: React.FC<IdeasIndexPageProps> = ({
  ideas,
  isCreateModalOpen: isModalOpen = false,
}) => {
  const route = useRoute()
  const { post, data, setData, errors, reset } = useForm({
    text: '',
  })

  const {
    props: {
      flash: { message },
    },
  } = useTypedPage()

  const {
    isToggled: isCreateModalOpen,
    setIsToggled: setIsCreateModalOpen,
    toggle: toggleCreateModal,
  } = useToggleState(isModalOpen)

  const submitForm = useCallback(() => {
    post(route('ideas.store'), {
      onSuccess() {
        setIsCreateModalOpen(false)
        reset()
      },
    })
  }, [post, reset, route, setIsCreateModalOpen])

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
    <AuthenticatedLayout>
      <Navbar backRoute="home">
        <button onClick={toggleCreateModal}>Submit idea</button>
      </Navbar>
      {message && <div>{message}</div>}
      <div className="h-full overflow-auto">
        <ul>
          {ideas.map((idea) => (
            <li key={idea.id}>{idea.text}</li>
          ))}
        </ul>
      </div>
      <Modal isOpen={isCreateModalOpen} setIsOpen={setIsCreateModalOpen}>
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
    </AuthenticatedLayout>
  )
}

export default IdeasIndexPage
