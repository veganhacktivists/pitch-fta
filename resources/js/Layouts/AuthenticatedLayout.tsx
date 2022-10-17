import React, { ReactNode, useEffect, useState } from 'react'
import { Link } from '@inertiajs/inertia-react'
import { ParentComponent } from '@/Types/components'
import { ApplicationLogo } from '@/Components/ApplicationLogo'
import useRoute from '@/Hooks/useRoute'
import { SizeWatcher } from '@/Components/SizeWatcher'
import useTypedPage from '@/Hooks/useTypedPage'
import { BadgeObtainedModal } from '@/Components/BadgeObtainedModal'

interface AuthenticatedLayoutProps {
  backRoute?: string
  renderLeft?: () => ReactNode
  renderNav?: () => ReactNode
}

const AuthenticatedLayout: ParentComponent<AuthenticatedLayoutProps> = ({
  children,
  backRoute,
  renderNav,
  renderLeft,
}) => {
  const route = useRoute()

  const [isBadgeModalOpen, setIsBadgeModalOpen] = useState(false)

  const {
    props: {
      flash: { badge, badgeTask, progress },
    },
  } = useTypedPage()

  useEffect(() => {
    if (badge || badgeTask) {
      setIsBadgeModalOpen(true)
    }
  }, [badge, badgeTask])

  return (
    <SizeWatcher isFullScreen>
      {({ width, height }) => (
        <div
          className="flex flex-col overflow-hidden bg-stone-700"
          style={{ width, height }}
        >
          <nav>
            <div className="flex h-20 items-center justify-evenly px-4 text-white">
              <div className="flex-1">
                {backRoute && <Link href={route(backRoute)}>Back</Link>}
                {renderLeft?.()}
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
          <BadgeObtainedModal
            badge={badge}
            badgeTask={badgeTask}
            progress={progress}
            isOpen={isBadgeModalOpen}
            setIsOpen={setIsBadgeModalOpen}
          />
        </div>
      )}
    </SizeWatcher>
  )
}

export default AuthenticatedLayout
