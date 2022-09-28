import React, { useCallback } from 'react'
import { Head, useForm } from '@inertiajs/inertia-react'
import useRoute from '@/Hooks/useRoute'
import { TextInput } from '@/Components/TextInput'
import { InputError } from '@/Components/InputError'
import { PrimaryButton } from '@/Components/PrimaryButton'
import { GuestLayout } from '@/Layouts/GuestLayout'

const WelcomePage = () => {
  const { data, setData, post, errors } = useForm({
    email: '',
  })

  const route = useRoute()

  const onSubmit = useCallback<React.FormEventHandler<HTMLFormElement>>(
    (e) => {
      e.preventDefault()

      post(route('route_based_on_email'))
    },
    [post, route],
  )

  return (
    <GuestLayout>
      <Head title="Welcome" />
      <h1 className="text-center">WELCOME</h1>
      <form onSubmit={onSubmit}>
        <TextInput
          name="email"
          value={data.email}
          className="mt-1 block w-full"
          autoComplete="username"
          setData={setData}
        />

        <InputError message={errors.email} />
        <PrimaryButton type="submit">Continue</PrimaryButton>
      </form>
    </GuestLayout>
  )
}

export default WelcomePage
