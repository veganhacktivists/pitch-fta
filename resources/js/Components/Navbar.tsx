import React from 'react'
import { Link } from '@inertiajs/inertia-react'
import { ParentComponent } from '@/Types/components'
import useRoute from '@/Hooks/useRoute'

interface NavbarProps {
  backRoute?: string
}

export const Navbar: ParentComponent<NavbarProps> = ({
  backRoute,
  children,
}) => {
  const route = useRoute()

  return (
    <div className="flex justify-between gap-4 p-4">
      <div>{backRoute && <Link href={route(backRoute)}>Back</Link>}</div>
      <div>{children}</div>
    </div>
  )
}
