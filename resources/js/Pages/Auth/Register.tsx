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

      <div className="nes-container is-dark with-title">
        <h2 className="title">Sign up</h2>
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
              className="mt-1 block w-full"
              autoComplete="username"
              setData={setData}
              required
            />
            <InputError message={errors.email} />
          </FormField>
          <FormField>
            <InputLabel htmlFor="name">Name (optional)</InputLabel>

            <TextInput
              name="name"
              value={data.name}
              className="mt-1 block w-full"
              autoComplete="name"
              setData={setData}
            />

            <InputError message={errors.name} />
          </FormField>

          <FormField>
            <InputLabel htmlFor="password">4-Digit Pin</InputLabel>

            <PasswordInput
              name="password"
              value={data.password}
              autoComplete="new-password"
              title="Please enter a four-digit pin"
              className="w-full"
              setData={setData}
            />

            <InputError message={errors.password} />
          </FormField>

          <PrimaryButton className="ml-4">Register</PrimaryButton>
        </form>
      </div>
      <div className="mt-4 text-center">
        <Link
          className="mx-auto border-b border-gray-100 pb-1 text-gray-100"
          href={route('login')}
        >
          Already registered?
        </Link>
      </div>
    </GuestLayout>
  )
}

export default RegisterPage
