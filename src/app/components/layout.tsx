import { FunctionComponent, Fragment } from 'react'

import { ServiceWorker } from './serviceWorker'

export const AppLayout: FunctionComponent = props => {
  const { children } = props

  return (
    <Fragment>
      {children}
      <ServiceWorker />
    </Fragment>
  )
}
