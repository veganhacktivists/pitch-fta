import React from 'react'
import { Head, Link } from '@inertiajs/inertia-react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import useRoute from '@/Hooks/useRoute'

const HomePage = () => {
  const route = useRoute()

  return (
    <AuthenticatedLayout>
      <Head title="Welcome" />
      <div className="flex h-full flex-col items-center justify-around">
        <Link href={route('ideas.create')}>Submit idea</Link>
        <Link href={route('ideas.index')}>View submissions</Link>
        <Link href={route('earn')}>Earn more votes</Link>
      </div>
    </AuthenticatedLayout>
  )
}

export default HomePage
