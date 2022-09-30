import React, { useCallback, useEffect } from 'react'
import { Head, Link, useForm } from '@inertiajs/inertia-react'
import { GuestLayout } from '@/Layouts/GuestLayout'
import { InputError } from '@/Components/InputError'
import { InputLabel } from '@/Components/InputLabel'
import { PrimaryButton } from '@/Components/PrimaryButton'
import { TextInput } from '@/Components/TextInput'
import useRoute from '@/Hooks/useRoute'
import { useSearchParams } from '@/Hooks/useSearchParams'

const LoginPage = () => {
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

      <form onSubmit={onSubmit}>
        <div>
          <InputLabel htmlFor="email">Email</InputLabel>

          <TextInput
            type="text"
            name="email"
            value={data.email}
            className="mt-1 block w-full"
            autoComplete="username"
            setData={setData}
          />

          <InputError message={errors.email} className="mt-2" />
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="password">Pin</InputLabel>

          <TextInput
            type="password"
            name="password"
            value={data.password}
            className="mt-1 block w-full"
            autoComplete="current-password"
            setData={setData}
          />

          <InputError message={errors.password} className="mt-2" />
        </div>

        <div className="mt-4 flex items-center justify-end">
          <Link
            href={route('password.request')}
            className="text-sm text-gray-600 underline hover:text-gray-900"
          >
            Forgot your password?
          </Link>

          <PrimaryButton className="ml-4">Log in</PrimaryButton>
        </div>
      </form>
    </GuestLayout>
  )
}

export default LoginPage
