import React, { useCallback } from 'react'
import { Head, useForm } from '@inertiajs/inertia-react'
import { GuestLayout } from '@/Layouts/GuestLayout'
import { InputError } from '@/Components/InputError'
import { PrimaryButton } from '@/Components/Forms/PrimaryButton'
import { TextInput } from '@/Components/Forms/TextInput'
import useRoute from '@/Hooks/useRoute'

interface ForgotPasswordPageProps {
  status?: string
}

const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = ({ status }) => {
  const route = useRoute()
  const { data, setData, post, processing, errors } = useForm({
    email: '',
  })

  const onSubmit = useCallback<React.FormEventHandler<HTMLFormElement>>(
    (e) => {
      e.preventDefault()

      post(route('password.email'))
    },
    [post, route],
  )

  return (
    <GuestLayout>
      <Head title="Forgot Password" />

      <div className="nes-container is-dark with-title">
        <h2 className="title">Password reset</h2>
        <form
          onSubmit={onSubmit}
          className="mx-auto flex h-full flex-col gap-6"
        >
          <p>
            Forgot your password? No problem! Type in your email address and we
            will email you a password reset link.
          </p>
          <TextInput
            type="text"
            name="email"
            value={data.email}
            className="mt-1 block w-full"
            setData={setData}
          />

          <InputError message={errors.email} />

          <PrimaryButton disabled={processing}>
            Email Password Reset Link
          </PrimaryButton>
          {status && <div className="nes-text is-success">{status}</div>}
        </form>
      </div>
    </GuestLayout>
  )
}

export default ForgotPasswordPage
