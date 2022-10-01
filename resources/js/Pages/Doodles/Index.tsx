import React from 'react'
import { Head, Link } from '@inertiajs/inertia-react'
import { Navbar } from '@/Components/Navbar'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import useRoute from '@/Hooks/useRoute'
import { Doodle } from '@/Types'

interface DoodlesIndexPageProps {
  doodles: Doodle[]
}

const DoodlesIndexPage: React.FC<DoodlesIndexPageProps> = ({ doodles }) => {
  const route = useRoute()

  return (
    <AuthenticatedLayout>
      <Head title="Doodles" />
      <Navbar backRoute="earn">
        <Link href={route('doodles.create')}>New doodle</Link>
      </Navbar>

      <div className="grid grid-cols-2">
        {doodles.map((doodle) => {
          return (
            <Link
              href={route('doodles.show', doodle.id)}
              key={doodle.id}
              className="col-span-1"
            >
              <img
                src={`/${doodle.path}`}
                alt="Doodle"
                className="h-full w-full object-cover"
              />
            </Link>
          )
        })}
      </div>
    </AuthenticatedLayout>
  )
}

export default DoodlesIndexPage
