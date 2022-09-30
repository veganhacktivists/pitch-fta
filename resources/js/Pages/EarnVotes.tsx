import React from 'react'
import { Head, Link } from '@inertiajs/inertia-react'
import useRoute from '@/Hooks/useRoute'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Navbar } from '@/Components/Navbar'

const EarnVotesPage = () => {
  const route = useRoute()

  return (
    <AuthenticatedLayout>
      <Head title="Earn votes" />
      <Navbar backRoute="home">hi</Navbar>
      <div className="flex h-full flex-col items-center justify-around">
        <Link href={route('trivia.question')}>Trivia</Link>
        <Link href={route('home')}>Scan QR Code</Link>
        <Link href={route('home')}>Submit a doodle</Link>
        <Link href={route('home')}>Share the app</Link>
      </div>
    </AuthenticatedLayout>
  )
}

export default EarnVotesPage
