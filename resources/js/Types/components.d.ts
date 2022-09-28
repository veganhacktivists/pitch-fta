import React from 'react'

export type ParentComponent<P = unknown> = React.FC<React.PropsWithChildren<P>>
