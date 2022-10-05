import React, { useCallback, useEffect } from 'react'
import { Head, useForm } from '@inertiajs/inertia-react'
import { GuestLayout } from '@/Layouts/GuestLayout'
import { InputError } from '@/Components/InputError'
import { InputLabel } from '@/Components/Forms/InputLabel'
import { PrimaryButton } from '@/Components/Forms/PrimaryButton'
import { TextInput } from '@/Components/Forms/TextInput'
import useRoute from '@/Hooks/useRoute'

const ConfirmPasswordPage = () => {
  const route = useRoute()
  const { data, setData, post, processing, errors, reset } = useForm({
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

      post(route('password.confirm'))
    },
    [post, route],
  )

  return (
    <GuestLayout>
      <Head title="Confirm Password" />

      <div className="mb-4 text-sm text-gray-600">
        This is a secure area of the application. Please confirm your password
        before continuing.
      </div>

      <form onSubmit={onSubmit}>
        <div className="mt-4">
          <InputLabel htmlFor="password">Password</InputLabel>

          <TextInput
            type="password"
            name="password"
            value={data.password}
            className="mt-1 block w-full"
            setData={setData}
          />

          <InputError message={errors.password} />
        </div>

        <div className="mt-4 flex items-center justify-end">
          <PrimaryButton className="ml-4" disabled={processing}>
            Confirm
          </PrimaryButton>
        </div>
      </form>
    </GuestLayout>
  )
}

export default ConfirmPasswordPage
