import React, { ReactNode, useEffect } from 'react'
import { Link } from '@inertiajs/inertia-react'
import { ParentComponent } from '@/Types/components'
import { ApplicationLogo } from '@/Components/ApplicationLogo'
import useRoute from '@/Hooks/useRoute'

interface AuthenticatedLayoutProps {
  backRoute?: string
  renderNav?: () => ReactNode
  orientation?: OrientationLockType
}

const AuthenticatedLayout: ParentComponent<AuthenticatedLayoutProps> = ({
  children,
  backRoute,
  renderNav,
  orientation,
}) => {
  const route = useRoute()

  useEffect(() => {
    if (orientation) {
      try {
        window.screen.orientation.lock(orientation)
      } catch (e) {
        // not available on device
      }
    }
  }, [orientation])

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

          <div className="flex-1 text-right">{renderNav?.()}</div>
        </div>
      </nav>
      <main className="flex h-full flex-col overflow-hidden">{children}</main>
    </div>
  )
}

export default AuthenticatedLayout
