import { Fragment } from 'react'

import { NextPage } from 'next'

import { HeadTitle } from '../core/components/headTitle'

const Page: NextPage = props => {
  return (
    <Fragment>
      <HeadTitle title="Home" />
      <h1 className="font-bold text-2xl">Hello</h1>
    </Fragment>
  )
}

export default Page
