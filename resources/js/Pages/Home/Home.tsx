import React, { useCallback, useState } from 'react'
import { Head } from '@inertiajs/inertia-react'
import classNames from 'classnames'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import useRoute from '@/Hooks/useRoute'
import { PrimaryButtonLink } from '@/Components/Forms/PrimaryButton'
import { Button, ButtonLink } from '@/Components/Forms/Button'
import { VoteCount } from '@/Components/VoteCount'
import { ShareModal } from './ShareModal'
import useTypedPage from '@/Hooks/useTypedPage'
import { Badge } from '@/Types'
import { hasBadge } from '@/Util/badges'
import { BadgeDescriptionModal } from './BadgeDescriptionModal'

interface HomePageProps {
  badges: Badge[]
}

const HomePage: React.FC<HomePageProps> = ({ badges }) => {
  const {
    props: {
      auth: { user },
    },
  } = useTypedPage()
  const route = useRoute()

  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [isBadgeModalOpen, setIsBadgeModalOpen] = useState(false)

  const onClickShare = useCallback(() => {
    const url = route('register', {
      referrer: user.referral_code,
    })

    if ('canShare' in navigator && navigator.canShare({ url })) {
      navigator.share({
        url,
      })
    } else {
      setIsShareModalOpen(true)
    }
  }, [route, setIsShareModalOpen, user.referral_code])

  const onClickBadge = useCallback((badge: Badge) => {
    setSelectedBadge(badge)
    setIsBadgeModalOpen(true)
  }, [])

  return (
    <AuthenticatedLayout renderNav={() => <VoteCount />}>
      <Head title="Welcome" />
      <div className="flex h-full flex-col gap-4 overflow-auto">
        <div className="grid grid-cols-2 gap-4 px-4">
          <PrimaryButtonLink className="col-span-2" href={route('ideas.index')}>
            Ideas
          </PrimaryButtonLink>
          <ButtonLink href={route('doodles.index')}>Doodles</ButtonLink>
          <ButtonLink href={route('trivia.question')}>Trivia</ButtonLink>
          <ButtonLink href={route('scan')}>Scan QR</ButtonLink>
          <Button onClick={onClickShare}>Share</Button>
        </div>
        <div className="nes-container is-rounded is-dark with-title">
          <h2 className="title">Badges</h2>
          <div className="grid grid-cols-2 place-items-center gap-4 sm:grid-cols-4">
            {badges.map((badge) => (
              <button
                className={classNames(
                  'flex flex-col items-center gap-4 sm:w-1/4',
                  !hasBadge(user, badge) && 'grayscale',
                )}
                key={badge.id}
                onClick={() => onClickBadge(badge)}
              >
                <img
                  src={badge.icon_path}
                  alt={badge.title}
                  className="max-w-[64px]"
                />
                <h3>
                  {badge.title.split(' ').map((word, j) => (
                    <React.Fragment key={j}>
                      {word}
                      {j === 0 && <br />}
                    </React.Fragment>
                  ))}
                </h3>
              </button>
            ))}
          </div>
        </div>
      </div>
      <ShareModal isOpen={isShareModalOpen} setIsOpen={setIsShareModalOpen} />
      <BadgeDescriptionModal
        isOpen={isBadgeModalOpen}
        badge={selectedBadge}
        setIsOpen={setIsBadgeModalOpen}
      />
    </AuthenticatedLayout>
  )
}

export default HomePage
