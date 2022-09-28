import React, { useCallback, useEffect } from 'react'
import { Head, Link, useForm } from '@inertiajs/inertia-react'
import { GuestLayout } from '@/Layouts/GuestLayout'
import { InputError } from '@/Components/InputError'
import { InputLabel } from '@/Components/InputLabel'
import { PrimaryButton } from '@/Components/PrimaryButton'
import { TextInput } from '@/Components/TextInput'
import useRoute from '@/Hooks/useRoute'
import { useSearchParams } from '@/Hooks/useSearchParams'

const RegisterPage = () => {
  const route = useRoute()
  const params = useSearchParams()

  const { data, setData, post, errors, reset } = useForm({
    name: '',
    email: params.email,
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

      post(route('register'))
    },
    [post, route],
  )

  return (
    <GuestLayout>
      <Head title="Register" />

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
            required
          />
          <InputError message={errors.email} className="mt-2" />
        </div>
        <div className="mt-4">
          <InputLabel htmlFor="name">Name</InputLabel>

          <TextInput
            name="name"
            value={data.name}
            className="mt-1 block w-full"
            autoComplete="name"
            required
            setData={setData}
          />

          <InputError message={errors.name} className="mt-2" />
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
            required
          />

          <InputError message={errors.password} className="mt-2" />
        </div>

        <div className="flex items-center justify-end mt-4">
          <Link
            href={route('login')}
            className="underline text-sm text-gray-600 hover:text-gray-900"
          >
            Already registered?
          </Link>

          <PrimaryButton className="ml-4">Register</PrimaryButton>
        </div>
      </form>
    </GuestLayout>
  )
}

export default RegisterPage
