import React from 'react'
import classNames from 'classnames'
import { Head, Link } from '@inertiajs/inertia-react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import useRoute from '@/Hooks/useRoute'
import { Doodle } from '@/Types'
import useTypedPage from '@/Hooks/useTypedPage'
import { PrimaryButtonLink } from '@/Components/Forms/PrimaryButton'

interface DoodlesIndexPageProps {
  doodles: Doodle[]
}

const DoodlesIndexPage: React.FC<DoodlesIndexPageProps> = ({ doodles }) => {
  const {
    props: {
      auth: { user },
    },
  } = useTypedPage()
  const route = useRoute()

  return (
    <AuthenticatedLayout
      backRoute="home"
      renderNav={() => <Link href={route('doodles.create')}>New</Link>}
    >
      <Head title="Doodles" />

      {doodles.length <= 0 && (
        <div className="flex h-full items-center">
          <div className="nes-container is-rounded is-dark with-title">
            <h2 className="title">Hey!</h2>
            <p>
              It looks like nobody has submitted a doodle yet. Want to be the
              first?
            </p>
            <PrimaryButtonLink
              href={route('doodles.create')}
              className="mt-4 w-full"
            >
              New doodle
            </PrimaryButtonLink>
          </div>
        </div>
      )}
      {doodles.length > 0 && (
        <div className="flex h-full flex-col gap-2 overflow-auto [image-rendering:auto]">
          {doodles.map((doodle) => {
            const doesBelongToUser = user.id === doodle.user_id

            return (
              <Link href={route('doodles.show', doodle.id)} key={doodle.id}>
                <div
                  className={classNames(
                    'nes-container is-rounded is-dark',
                    doesBelongToUser && 'with-title',
                  )}
                >
                  {doesBelongToUser && (
                    <p className="title">
                      <i className="nes-icon is-small heart" />
                      <span className="ml-1 inline-block">Yours</span>
                    </p>
                  )}
                  <img
                    src={`/${doodle.path}`}
                    alt="Doodle"
                    className="h-full w-full object-cover"
                  />
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </AuthenticatedLayout>
  )
}

export default DoodlesIndexPage
