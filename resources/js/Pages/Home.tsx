import React from 'react'
import useTypedPage from '@/Hooks/useTypedPage'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'

const HomePage = () => {
  const { props } = useTypedPage()

  return <AuthenticatedLayout auth={props.auth}>HEYYY</AuthenticatedLayout>
}

export default HomePage
