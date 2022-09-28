import './bootstrap'
import '../css/app.css'

import React from 'react'
import { createRoot } from 'react-dom/client'
import { createInertiaApp } from '@inertiajs/inertia-react'
import { InertiaProgress } from '@inertiajs/progress'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import { RouteContext } from './Hooks/useRoute'

const appName =
  window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel'

createInertiaApp({
  title: (title) => `${title} | ${appName}`,
  resolve: (name) =>
    resolvePageComponent(
      `./Pages/${name}.tsx`,
      import.meta.glob('./Pages/**/*.tsx'),
    ),
  setup({ el, App, props }) {
    const root = createRoot(el)

    root.render(
      <RouteContext.Provider value={window.route}>
        <App {...props} />
      </RouteContext.Provider>,
    )
  },
})

InertiaProgress.init({ color: '#4B5563' })
