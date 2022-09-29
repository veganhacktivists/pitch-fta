import React from 'react'
import { Link } from '@inertiajs/inertia-react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import useRoute from '@/Hooks/useRoute'

const HomePage = () => {
  const route = useRoute()
  return (
    <AuthenticatedLayout>
      <div className="flex w-full flex-col items-center justify-around">
        <Link href={route('ideas.create')}>Submit idea</Link>
        <Link href={route('ideas.index')}>View submissions</Link>
        <button>Earn more votes</button>
      </div>
    </AuthenticatedLayout>
  )
}

export default HomePage
