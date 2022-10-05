import React from 'react'
import { Head, Link } from '@inertiajs/inertia-react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import useRoute from '@/Hooks/useRoute'
import { PrimaryButtonLink } from '@/Components/Forms/PrimaryButton'
import { ButtonLink } from '@/Components/Forms/Button'
import { VoteCount } from '@/Components/VoteCount'

const HomePage = () => {
  const route = useRoute()

  return (
    <AuthenticatedLayout renderNav={() => <VoteCount />}>
      <Head title="Welcome" />
      <div className="flex h-full flex-col gap-4 overflow-auto">
        <div className="grid grid-cols-2 gap-4 px-4">
          <PrimaryButtonLink className="col-span-2" href={route('ideas.index')}>
            Ideas
          </PrimaryButtonLink>
          <ButtonLink href={route('doodles.index')}>Doodles</ButtonLink>
          <ButtonLink href={route('trivia.question')}>Trivia</ButtonLink>
          <ButtonLink href="/">Scan QR</ButtonLink>
          <ButtonLink href="/">Share</ButtonLink>
        </div>
        <div className="nes-container is-rounded is-dark with-title">
          <h2 className="title">Badges</h2>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}

export default HomePage
