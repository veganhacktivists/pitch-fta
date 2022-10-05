import React, { useCallback } from 'react'
import { Head, useForm } from '@inertiajs/inertia-react'
import useRoute from '@/Hooks/useRoute'
import { TextInput } from '@/Components/Forms/TextInput'
import { InputError } from '@/Components/InputError'
import { PrimaryButton } from '@/Components/Forms/PrimaryButton'
import { GuestLayout } from '@/Layouts/GuestLayout'
import { InputLabel } from '@/Components/Forms/InputLabel'
import { FormField } from '@/Components/Forms/FormField'

const RouteUserBasedOnEmailPage = () => {
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

      <div className="nes-container is-dark with-title">
        <h2 className="title">Hi there!</h2>
        <form
          onSubmit={onSubmit}
          className="mx-auto flex h-full flex-col gap-6"
        >
          <FormField>
            <InputLabel htmlFor="email" className="pb-2">
              Enter your email to join the VH@AVA experience.
            </InputLabel>
            <TextInput
              type="email"
              name="email"
              id="email"
              className="w-full"
              value={data.email}
              setData={setData}
              autoComplete="username"
            />

            <InputError message={errors.email} />
          </FormField>

          <PrimaryButton type="submit">Continue</PrimaryButton>
        </form>
      </div>
    </GuestLayout>
  )
}

export default RouteUserBasedOnEmailPage
