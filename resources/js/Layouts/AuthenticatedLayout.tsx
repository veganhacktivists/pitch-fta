import React, { ReactNode } from 'react'
import { Link } from '@inertiajs/inertia-react'
import { ParentComponent } from '@/Types/components'
import { ApplicationLogo } from '@/Components/ApplicationLogo'
import useRoute from '@/Hooks/useRoute'
import { SizeWatcher } from '@/Components/SizeWatcher'

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

  return (
    <SizeWatcher isFullScreen>
      {({ width, height }) => (
        <div
          className="street flex flex-col overflow-hidden"
          style={{ width, height }}
        >
          <nav>
            <div className="flex h-20 items-center justify-evenly px-4 text-white">
              <div className="flex-1">
                {backRoute && <Link href={route(backRoute)}>Back</Link>}
              </div>
              <div className="flex-1 text-center">
                <Link href="/">
                  <ApplicationLogo className="h-12 w-12" />
                </Link>
              </div>

              <div className="flex-1 text-right">{renderNav?.()}</div>
            </div>
          </nav>
          <main className="flex h-full flex-col overflow-hidden">
            {children}
          </main>
        </div>
      )}
    </SizeWatcher>
  )
}

export default AuthenticatedLayout
