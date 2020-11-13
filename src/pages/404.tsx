import { Fragment } from 'react'

import { NextPage } from 'next'

import { NotFound } from '../modules/404/components/notFound'
import { HeadTitle } from '../core/components/headTitle'

const Page: NextPage = props => {
  return (
    <Fragment>
      <HeadTitle title="Not Found" />
      <NotFound />
    </Fragment>
  )
}

export default Page
