import React, { useCallback, useEffect } from 'react'
import { Head, useForm } from '@inertiajs/inertia-react'
import { GuestLayout } from '@/Layouts/GuestLayout'
import { InputError } from '@/Components/InputError'
import { InputLabel } from '@/Components/InputLabel'
import { PrimaryButton } from '@/Components/PrimaryButton'
import { TextInput } from '@/Components/TextInput'
import useRoute from '@/Hooks/useRoute'

const ResetPasswordPage = ({
  token,
  email,
}: {
  token: string
  email: string
}) => {
  const route = useRoute()
  const { data, setData, post, processing, errors, reset } = useForm({
    token,
    email,
    password: '',
  })

  useEffect(() => {
    return () => {
      reset('password')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSubmit = useCallback<React.FormEventHandler<HTMLFormElement>>(
    (e) => {
      e.preventDefault()

      post(route('password.update'))
    },
    [post, route],
  )

  return (
    <GuestLayout>
      <Head title="Reset Password" />

      <form onSubmit={onSubmit}>
        <div>
          <InputLabel htmlFor="email">Email</InputLabel>

          <TextInput
            type="email"
            name="email"
            value={data.email}
            className="mt-1 block w-full"
            autoComplete="username"
            setData={setData}
          />

          <InputError message={errors.email} className="mt-2" />
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="password">Password</InputLabel>

          <TextInput
            type="password"
            name="password"
            value={data.password}
            className="mt-1 block w-full"
            autoComplete="new-password"
            setData={setData}
          />

          <InputError message={errors.password} className="mt-2" />
        </div>

        <div className="flex items-center justify-end mt-4">
          <PrimaryButton className="ml-4" disabled={processing}>
            Reset Password
          </PrimaryButton>
        </div>
      </form>
    </GuestLayout>
  )
}

export default ResetPasswordPage
