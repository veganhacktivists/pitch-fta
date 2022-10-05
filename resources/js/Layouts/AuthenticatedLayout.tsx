import React, { ReactNode } from 'react'
import { Link } from '@inertiajs/inertia-react'
import { ParentComponent } from '@/Types/components'
import { ApplicationLogo } from '@/Components/ApplicationLogo'
import useTypedPage from '@/Hooks/useTypedPage'
import useRoute from '@/Hooks/useRoute'

interface AuthenticatedLayoutProps {
  backRoute?: string
  renderNav?: () => ReactNode
}

const AuthenticatedLayout: ParentComponent<AuthenticatedLayoutProps> = ({
  children,
  backRoute,
  renderNav,
}) => {
  const route = useRoute()
  const {
    props: { auth },
  } = useTypedPage()

  return (
    <div className="street flex h-screen flex-col overflow-hidden">
      <nav>
        <div className="flex h-16 items-center justify-evenly px-4 text-white">
          <div className="flex-1">
            {backRoute && <Link href={route(backRoute)}>Back</Link>}
          </div>
          <div className="flex-1 text-center">
            <Link href="/">
              <ApplicationLogo className="text-xl" />
            </Link>
          </div>

          <div className="flex-1 text-right">
            {renderNav?.() || (
              <div>
                {auth.user.num_votes} vote{auth.user.num_votes === 1 ? '' : 's'}
              </div>
            )}
          </div>
        </div>
      </nav>
      <main className="flex h-full flex-col overflow-hidden">{children}</main>
    </div>
  )
}

export default AuthenticatedLayout
