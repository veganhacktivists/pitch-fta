import React from 'react'
import { Link } from '@inertiajs/inertia-react'
import { ParentComponent } from '@/Types/components'
import { ApplicationLogo } from '@/Components/ApplicationLogo'

import { SizeWatcher } from '@/Components/SizeWatcher'

export const GuestLayout: ParentComponent = ({ children }) => {
  return (
    <SizeWatcher isFullScreen>
      {({ width, height }) => (
        <div
          className="street flex flex-col overflow-hidden"
          style={{ width, height }}
        >
          <main className="flex h-full flex-col overflow-auto pb-4">
            <nav>
              <div className="grid h-20 place-items-center px-4 text-white">
                <Link href="/">
                  <ApplicationLogo className="text-xl" />
                </Link>
              </div>
            </nav>
            {children}
          </main>
        </div>
      )}
    </SizeWatcher>
  )
}
