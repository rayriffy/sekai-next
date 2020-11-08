import { Fragment } from 'react'

import { NextPage } from 'next'
import { AppProps } from 'next/app'

import { Context } from '../context/storeon'
import { AppLayout } from '../app/components/appLayout'
import { HeadTitle } from '../core/components/headTitle'

import '../styles/tailwind.css'

const NextApp: NextPage<AppProps> = props => {
  const { Component, pageProps } = props

  return (
    <Context>
      <HeadTitle />
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </Context>
  )
}

export default NextApp
