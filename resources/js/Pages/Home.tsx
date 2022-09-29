import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'

const HomePage = () => {
  return (
    <AuthenticatedLayout>
      <div className="flex w-full flex-col items-center justify-around">
        <button>Submit idea</button>
        <button>Cast vote</button>
        <button>Earn more votes</button>
      </div>
    </AuthenticatedLayout>
  )
}

export default HomePage
