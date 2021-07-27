import { FunctionComponent, memo } from 'react'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import { Music } from '../../../@types/Music'

interface Props {
  music: Pick<Music, 'title' | 'arranger' | 'lyricist' | 'composer' | 'publishedAt'>
}

dayjs.extend(relativeTime)

export const DescriptionCard: FunctionComponent<Props> = memo(props => {
  const { music } = props

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg my-8">
      <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Music Information
        </h3>
        <p className="mt-1 max-w-2xl text-sm leading-5 text-gray-500">
          Metadata and descriptions
        </p>
      </div>
      <div className="px-4 py-5 sm:px-6">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
          <div className="sm:col-span-1">
            <dt className="text-sm leading-5 font-medium text-gray-500">
              Title
            </dt>
            <dd className="mt-1 text-sm leading-5 text-gray-900">
              {music.title}
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm leading-5 font-medium text-gray-500">
              Arranger
            </dt>
            <dd className="mt-1 text-sm leading-5 text-gray-900">
              {music.arranger}
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm leading-5 font-medium text-gray-500">
              Composer
            </dt>
            <dd className="mt-1 text-sm leading-5 text-gray-900">
              {music.composer}
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm leading-5 font-medium text-gray-500">
              Lyricist
            </dt>
            <dd className="mt-1 text-sm leading-5 text-gray-900">
              {music.lyricist}
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm leading-5 font-medium text-gray-500">
              Release to the game
            </dt>
            <dd className="mt-1 text-sm leading-5 text-gray-900">
              {dayjs(music.publishedAt).format('DD MMMM YYYY HH:MM')} (
              {dayjs(music.publishedAt).fromNow()})
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
})
