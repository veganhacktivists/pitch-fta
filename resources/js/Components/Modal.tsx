import { Dialog, Transition, TransitionEvents } from '@headlessui/react'
import React, { Fragment } from 'react'
import { ParentComponent } from '@/Types/components'
import { SizeWatcher } from './SizeWatcher'

interface ModalProps extends TransitionEvents {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export const Modal: ParentComponent<ModalProps> = ({
  isOpen,
  setIsOpen,
  children,
  ...transitionRootProps
}) => {
  const shouldTransition = !(window.isIOS && window.isChrome)

  return (
    <Transition.Root show={isOpen} as={Fragment} {...transitionRootProps}>
      <Dialog as="div" className="relative z-10" onClose={setIsOpen}>
        <Transition.Child
          as={Fragment}
          enter={`ease-out ${shouldTransition && 'duration-300'}`}
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave={`ease-in ${shouldTransition && 'duration-200'}`}
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className={`fixed inset-0 bg-gray-500 bg-opacity-75 ${
              shouldTransition && 'transition-opacity'
            }`}
          />
        </Transition.Child>

        <SizeWatcher isFullScreen>
          {({ width }) => (
            <div
              className="fixed inset-0 z-10 mx-auto overflow-y-auto"
              style={{ maxWidth: width }}
            >
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter={`ease-out ${shouldTransition && 'duration-300'}`}
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave={`ease-in ${shouldTransition && 'duration-200'}`}
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="nes-dialog is-rounded w-full bg-stone-700 text-left">
                    {children}
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          )}
        </SizeWatcher>
      </Dialog>
    </Transition.Root>
  )
}
