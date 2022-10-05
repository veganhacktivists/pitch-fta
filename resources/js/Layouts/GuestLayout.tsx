import React from 'react'
import { Link } from '@inertiajs/inertia-react'
import { ParentComponent } from '@/Types/components'
import { ApplicationLogo } from '@/Components/ApplicationLogo'

export const GuestLayout: ParentComponent = ({ children }) => {
  return (
    <div className="street screen-portrait flex h-screen flex-col">
      <div className="mx-auto flex items-center p-4 align-middle">
        <Link href="/" className="hover:no-underline">
          <ApplicationLogo className="m-0 pt-2 text-xl" />
        </Link>
      </div>

      <div className="h-full">{children}</div>
    </div>
  )
}
