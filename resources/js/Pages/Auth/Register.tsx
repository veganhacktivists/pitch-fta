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
          <InputLabel htmlFor="name">Name (optional)</InputLabel>

          <TextInput
            name="name"
            value={data.name}
            className="mt-1 block w-full"
            autoComplete="name"
            setData={setData}
          />

          <InputError message={errors.name} className="mt-2" />
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="password">4-Digit Pin</InputLabel>

          <TextInput
            type="password"
            name="password"
            value={data.password}
            className="mt-1 block w-full"
            autoComplete="new-password"
            setData={setData}
            inputMode="numeric"
            required
            minLength={4}
            maxLength={4}
            pattern="[0-9]{4}"
            title="Please enter a four-digit pin"
          />

          <InputError message={errors.password} className="mt-2" />
        </div>

        <div className="mt-4 flex items-center justify-end">
          <Link
            href={route('login')}
            className="text-sm text-gray-600 underline hover:text-gray-900"
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
