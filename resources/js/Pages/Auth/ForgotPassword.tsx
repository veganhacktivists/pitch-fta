import React, { useCallback } from 'react'
import { Head, useForm } from '@inertiajs/inertia-react'
import { GuestLayout } from '@/Layouts/GuestLayout'
import { InputError } from '@/Components/InputError'
import { PrimaryButton } from '@/Components/PrimaryButton'
import { TextInput } from '@/Components/TextInput'
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

      <div className="mb-4 text-sm leading-normal text-gray-500">
        Forgot your password? No problem. Just let us know your email address
        and we will email you a password reset link that will allow you to
        choose a new one.
      </div>

      {status && (
        <div className="mb-4 text-sm font-medium text-green-600">{status}</div>
      )}

      <form onSubmit={onSubmit}>
        <TextInput
          type="text"
          name="email"
          value={data.email}
          className="mt-1 block w-full"
          setData={setData}
        />

        <InputError message={errors.email} className="mt-2" />

        <div className="mt-4 flex items-center justify-end">
          <PrimaryButton className="ml-4" disabled={processing}>
            Email Password Reset Link
          </PrimaryButton>
        </div>
      </form>
    </GuestLayout>
  )
}

export default ForgotPasswordPage