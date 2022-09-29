import React from 'react'
import { Link } from '@inertiajs/inertia-react'
import useRoute from '@/Hooks/useRoute'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'

const EarnVotesPage = () => {
  const route = useRoute()

  return (
    <AuthenticatedLayout>
      <div className="flex w-full flex-col items-center justify-around">
        <Link href={route('home')}>Trivia</Link>
        <Link href={route('home')}>Scan QR Code</Link>
        <Link href={route('home')}>Submit a doodle</Link>
        <Link href={route('home')}>Share the app</Link>
      </div>
    </AuthenticatedLayout>
  )
}

export default EarnVotesPage
