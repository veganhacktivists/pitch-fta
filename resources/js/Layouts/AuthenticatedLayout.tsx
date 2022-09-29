import React from 'react'
import { Link } from '@inertiajs/inertia-react'
import { ParentComponent } from '@/Types/components'
import ApplicationLogo from '@/Components/ApplicationLogo'
import useTypedPage from '@/Hooks/useTypedPage'

const AuthenticatedLayout: ParentComponent = ({ children }) => {
  const {
    props: { auth },
  } = useTypedPage()

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-gray-100">
      <nav className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex">
              <div className="flex shrink-0 items-center">
                <Link href="/">
                  <ApplicationLogo className="block h-9 w-auto text-gray-500" />
                </Link>
              </div>
            </div>

            <div className="flex items-center sm:hidden">
              Votes: {auth.user.num_votes}
            </div>
          </div>
        </div>
      </nav>

      <main className="flex h-full overflow-auto">{children}</main>
    </div>
  )
}

export default AuthenticatedLayout
