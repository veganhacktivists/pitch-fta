import React, { useState } from 'react'
import { Link } from '@inertiajs/inertia-react'
import { ParentComponent } from '@/Types/components'
import { User } from '@/Types'
// import useRoute from '@/Hooks/useRoute'
import ApplicationLogo from '@/Components/ApplicationLogo'

interface AuthenticatedLayoutProps {
  auth: {
    user: User
  }
}

const AuthenticatedLayout: ParentComponent<AuthenticatedLayoutProps> = ({
  auth,
  children,
}) => {
  // const route = useRoute()
  const [showingNavigationDropdown, setShowingNavigationDropdown] =
    useState(false)

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="shrink-0 flex items-center">
                <Link href="/">
                  <ApplicationLogo className="block h-9 w-auto text-gray-500" />
                </Link>
              </div>

              <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                Left side
              </div>
            </div>

            <div className="hidden sm:flex sm:items-center sm:ml-6">
              <div className="ml-3 relative">Right side</div>
            </div>

            <div className="-mr-2 flex items-center sm:hidden">
              <button
                onClick={() =>
                  setShowingNavigationDropdown(
                    (previousState) => !previousState,
                  )
                }
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
              >
                <svg
                  className="h-6 w-6"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    className={
                      !showingNavigationDropdown ? 'inline-flex' : 'hidden'
                    }
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                  <path
                    className={
                      showingNavigationDropdown ? 'inline-flex' : 'hidden'
                    }
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div>
          <div className="pt-2 pb-3 space-y-1">Dashboard</div>

          <div className="pt-4 pb-1 border-t border-gray-200">
            <div className="px-4">
              <div className="font-medium text-base text-gray-800">
                {auth.user.name}
              </div>
              <div className="font-medium text-sm text-gray-500">
                {auth.user.email}
              </div>
            </div>

            <div className="mt-3 space-y-1">Log out</div>
          </div>
        </div>
      </nav>

      <main>{children}</main>
    </div>
  )
}

export default AuthenticatedLayout
