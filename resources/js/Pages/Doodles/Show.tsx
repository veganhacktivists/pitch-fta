import React from 'react'
import { Head } from '@inertiajs/inertia-react'
import { Navbar } from '@/Components/Navbar'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Doodle } from '@/Types'

interface DoodlesShowPageProps {
  doodle: Doodle
}

const DoodlesShowPage: React.FC<DoodlesShowPageProps> = ({ doodle }) => {
  return (
    <AuthenticatedLayout>
      <Head title="Doodle" />
      <Navbar backRoute="doodles.index" />

      <div className="flex h-full w-full">
        <img
          src={`/${doodle.path}`}
          alt="Doodle"
          className="mx-auto object-contain"
        />
      </div>
    </AuthenticatedLayout>
  )
}

export default DoodlesShowPage
