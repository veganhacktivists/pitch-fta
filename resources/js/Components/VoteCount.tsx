import React from 'react'
import useTypedPage from '@/Hooks/useTypedPage'

export const VoteCount = () => {
  const {
    props: { auth },
  } = useTypedPage()

  return (
    <>
      {auth.user.num_votes} {auth.user.num_votes === 1 ? 'vote' : 'votes'}
    </>
  )
}
