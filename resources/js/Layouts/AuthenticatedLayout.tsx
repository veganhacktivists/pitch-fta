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
    <div className="h-screen w-screen bg-gray-100 flex flex-col">
      <nav className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="shrink-0 flex items-center">
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

      <main className="flex h-full">{children}</main>
    </div>
  )
}

export default AuthenticatedLayout
