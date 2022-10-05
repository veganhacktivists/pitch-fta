import React from 'react'
import { Head } from '@inertiajs/inertia-react'
import useRoute from '@/Hooks/useRoute'
import { PrimaryButtonLink } from '@/Components/Forms/PrimaryButton'

const WelcomePage = () => {
  const route = useRoute()

  return (
    <div className="screen-portrait h-screen">
      <Head title="Welcome" />
      <div className="flex h-full flex-col justify-between">
        <img src="/sprites/welcome-splash.png" className="w-screen" alt="" />
        <div className="street flex flex-1 flex-col items-center justify-center pt-4 text-center text-white">
          <h1 className="text-xl">Welcome to AVA</h1>
          <p className="w-3/4">Vegan Hacktivsts</p>
        </div>
        <div className="grid h-1/6 flex-1 place-items-center border-t border-[#aeaeae] bg-[#61666f] outline outline-1 outline-[#3d3d52]">
          <PrimaryButtonLink
            href={route('route_based_on_email.show')}
            className="nes-btn is-primary"
          >
            Continue
          </PrimaryButtonLink>
        </div>
      </div>
    </div>
  )
}

export default WelcomePage
