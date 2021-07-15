import { Fragment } from 'react'

import { GetStaticProps, NextPage } from 'next'

import { MusicsListing } from '../modules/musics/components/listing'
import { HeadTitle } from '../core/components/headTitle'

import { Music } from '../@types/Music'

interface Props {
  musics: Pick<
    Music,
    | 'title'
    | 'categories'
    | 'lyricist'
    | 'composer'
    | 'arranger'
    | 'assetbundleName'
    | 'id'
  >[]
}

const Page: NextPage<Props> = props => {
  const { musics } = props

  return (
    <Fragment>
      <HeadTitle title="Musics" />
      <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        <MusicsListing {...{ musics }} />
      </div>
    </Fragment>
  )
}

export const getStaticProps: GetStaticProps<Props> = async context => {
  const { default: _ } = await import('lodash')
  const { getMusics } = await import('../core/services/getMusics')

  const { sortBy, reverse, pick } = _

  const musics = await getMusics()

  return {
    props: {
      // minus 1 refer to index
      musics: reverse(sortBy(musics, 'publishedAt')).map(o =>
        pick(o, [
          'title',
          'categories',
          'lyricist',
          'composer',
          'arranger',
          'assetbundleName',
          'id',
        ])
      ),
    },
  }
}

export default Page
