import React, { useCallback, useEffect } from 'react'
import { Head, useForm } from '@inertiajs/inertia-react'
import { GuestLayout } from '@/Layouts/GuestLayout'
import { InputError } from '@/Components/InputError'
import { InputLabel } from '@/Components/Forms/InputLabel'
import { PrimaryButton } from '@/Components/Forms/PrimaryButton'
import { TextInput } from '@/Components/Forms/TextInput'
import useRoute from '@/Hooks/useRoute'
import { FormField } from '@/Components/Forms/FormField'
import { PasswordInput } from '@/Components/PasswordInput'

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

      <div className="nes-container is-dark with-title">
        <h2 className="title">Password reset</h2>
        <form
          onSubmit={onSubmit}
          className="mx-auto flex h-full flex-col gap-6"
        >
          <FormField>
            <InputLabel htmlFor="email">Email</InputLabel>

            <TextInput
              type="email"
              name="email"
              value={data.email}
              className="w-full"
              autoComplete="username"
              setData={setData}
            />

            <InputError message={errors.email} />
          </FormField>

          <FormField>
            <InputLabel htmlFor="password">Password</InputLabel>

            <PasswordInput
              name="password"
              className="w-full"
              value={data.password}
              autoComplete="new-password"
              setData={setData}
            />

            <InputError message={errors.password} />
          </FormField>

          <PrimaryButton disabled={processing}>Reset Password</PrimaryButton>
        </form>
      </div>
    </GuestLayout>
  )
}

export default ResetPasswordPage
