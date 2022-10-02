import React from 'react'
import { Head, Link } from '@inertiajs/inertia-react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import useRoute from '@/Hooks/useRoute'
import { Doodle } from '@/Types'

interface DoodlesIndexPageProps {
  doodles: Doodle[]
}

const DoodlesIndexPage: React.FC<DoodlesIndexPageProps> = ({ doodles }) => {
  const route = useRoute()

  return (
    <AuthenticatedLayout
      backRoute="earn"
      renderNav={() => <Link href={route('doodles.create')}>New doodle</Link>}
    >
      <Head title="Doodles" />

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
