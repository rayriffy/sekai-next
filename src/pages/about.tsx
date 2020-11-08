import { Fragment } from 'react'

import { GetStaticProps, NextPage } from 'next'

import Markdown from 'markdown-to-jsx'

import { HeadTitle } from '../core/components/headTitle'

interface Props {
  md: string
}

const Page: NextPage<Props> = props => {
  return (
    <Fragment>
      <HeadTitle title="About" />
      <div className="max-w-4xl p-4 sm:p-6 lg:p-8 prose mx-auto">
        <Markdown children={props.md} />
      </div>
    </Fragment>
  )
}

export const getStaticProps: GetStaticProps<Props> = async context => {
  const fs = await import('fs')
  const path = await import('path')

  const filePath = path.join(process.cwd(), 'src/assets/about/en.md')
  const file = fs.readFileSync(filePath).toString()

  return {
    props: {
      md: file,
    },
  }
}

export default Page
