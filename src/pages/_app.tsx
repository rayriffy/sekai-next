import { NextPage } from 'next'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'

import { Context } from '../context/storeon'
import { AppLayout } from '../app/components/appLayout'
import { HeadTitle } from '../core/components/headTitle'

import '../styles/tailwind.css'

const NextApp: NextPage<AppProps> = props => {
  const { Component, pageProps } = props

  const { pathname } = useRouter()

  return (
    <Context>
      {!['/music/[id]'].includes(pathname) && <HeadTitle />}
      {['/og/music/[id]'].includes(pathname) ? (
        <Component {...pageProps} />
      ) : (
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      )}
    </Context>
  )
}

export default NextApp
