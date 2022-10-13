import React, { useCallback, useEffect } from 'react'
import { Head, Link, useForm } from '@inertiajs/inertia-react'
import { GuestLayout } from '@/Layouts/GuestLayout'
import { InputError } from '@/Components/InputError'
import { InputLabel } from '@/Components/Forms/InputLabel'
import { PrimaryButton } from '@/Components/Forms/PrimaryButton'
import { TextInput } from '@/Components/Forms/TextInput'
import useRoute from '@/Hooks/useRoute'
import { useSearchParams } from '@/Hooks/useSearchParams'
import { FormField } from '@/Components/Forms/FormField'
import { PasswordInput } from '@/Components/PasswordInput'

interface LoginPageProps {
  status?: string
}

const LoginPage: React.FC<LoginPageProps> = ({ status }) => {
  const route = useRoute()
  const searchParams = useSearchParams()
  const { data, setData, post, errors, reset } = useForm({
    email: searchParams.email,
    password: '',
    remember: '',
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

      post(route('login'))
    },
    [post, route],
  )

  return (
    <GuestLayout>
      <Head title="Log in" />

      <div className="nes-container is-dark with-title">
        <h2 className="title">Log in</h2>
        <form
          onSubmit={onSubmit}
          className="mx-auto flex h-full flex-col gap-6"
        >
          {status && <div className="nes-text is-success">{status}</div>}
          <FormField>
            <InputLabel htmlFor="email">Email</InputLabel>

            <TextInput
              type="text"
              name="email"
              value={data.email}
              className="w-full"
              autoComplete="username"
              setData={setData}
            />

            <InputError message={errors.email} />
          </FormField>

          <FormField>
            <InputLabel htmlFor="password">Pin</InputLabel>

            <PasswordInput
              name="password"
              value={data.password}
              autoComplete="current-password"
              title="Please enter your four-digit pin"
              className="w-full"
              setData={setData}
              autoFocus={searchParams.email.length > 0}
            />

            <InputError message={errors.password} />
          </FormField>

          <PrimaryButton className="translate-x-[2px]">Log in</PrimaryButton>
        </form>
      </div>
      <div className="mt-4 text-center">
        <Link
          className="mx-auto border-b border-gray-100 pb-1 text-gray-100"
          href={route('password.request')}
        >
          Forgot your password?
        </Link>
      </div>
    </GuestLayout>
  )
}

export default LoginPage
