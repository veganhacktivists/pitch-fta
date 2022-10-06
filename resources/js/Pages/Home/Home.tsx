import React, { useCallback, useState } from 'react'
import { Head } from '@inertiajs/inertia-react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import useRoute from '@/Hooks/useRoute'
import { PrimaryButtonLink } from '@/Components/Forms/PrimaryButton'
import { Button, ButtonLink } from '@/Components/Forms/Button'
import { VoteCount } from '@/Components/VoteCount'
import { ShareModal } from './ShareModal'
import useTypedPage from '@/Hooks/useTypedPage'

const HomePage = () => {
  const {
    props: {
      auth: { user },
    },
  } = useTypedPage()
  const route = useRoute()

  const [isShareModalOpen, setIsShareModalOpen] = useState(false)

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
          <ButtonLink href="/">Scan QR</ButtonLink>
          <Button onClick={onClickShare}>Share</Button>
        </div>
        <div className="nes-container is-rounded is-dark with-title">
          <h2 className="title">Badges</h2>
        </div>
      </div>
      {isShareModalOpen && (
        <ShareModal isOpen={isShareModalOpen} setIsOpen={setIsShareModalOpen} />
      )}
    </AuthenticatedLayout>
  )
}

export default HomePage
