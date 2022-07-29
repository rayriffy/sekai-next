import { Fragment } from 'react'

import { GetStaticProps, NextPage } from 'next'
import Image from 'next/image'

import { HeadTitle } from '../core/components/headTitle'

import { ComicTip } from '../@types/Tip'

interface Props {
  comics: Pick<ComicTip, 'id' | 'title' | 'assetbundleName'>[]
}

const Page: NextPage<Props> = props => {
  const { comics } = props

  return (
    <Fragment>
      <HeadTitle title="Comics" />
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 xl:gap-8">
          {comics.map((comic, i) => (
            <div
              key={`comic-${comic.id}`}
              className="bg-white overflow-hidden shadow rounded-t-lg"
            >
              <div className="px-4 py-5 sm:px-6 flex justify-between">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {comic.title}
                </h3>
                <h4 className="leading-6 font-medium text-gray-600">
                  #{i + 1}
                </h4>
              </div>
              <Image
                src={`https://minio.dnaroma.eu/sekai-assets/comic/one_frame_rip/${comic.assetbundleName}.webp`}
                width={644}
                height={478}
              />
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  )
}

export const getStaticProps: GetStaticProps<Props> = async context => {
  const { default: _ } = await import('lodash')
  const { getComics } = await import('../core/services/getComics')

  const { pick } = _

  const comics = await getComics()

  return {
    props: {
      comics: comics.map(comic =>
        pick(comic, ['id', 'title', 'assetbundleName'])
      ),
    },
  }
}

export default Page
