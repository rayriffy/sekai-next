import { Fragment } from 'react'

import { GetStaticProps, NextPage } from 'next'

import { HeadTitle } from '../core/components/headTitle'
import { VirtualLiveCard } from '../core/components/virtualLiveCard'

import { VirtualLive } from '../@types/VirtualLive'

interface Props {
  virtualLives: Pick<VirtualLive, 'id' | 'assetbundleName'>[]
  beginnerLives: Pick<VirtualLive, 'id' | 'assetbundleName'>[]
}

const Page: NextPage<Props> = props => {
  const { virtualLives, beginnerLives } = props

  return (
    <Fragment>
      <HeadTitle title="Virtual Lives" />
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        <div className="px-6 py-6 bg-blue-700 rounded-lg md:py-12 md:px-12 lg:py-16 lg:px-16 xl:flex xl:items-center">
          <div className="xl:w-0 xl:flex-1">
            <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              Never miss live again!
            </h2>
            <p className="mt-3 max-w-3xl text-lg leading-6 text-blue-200">
              Subscribe for calendar events here.
            </p>
            <p className="mt-1 text-blue-300 text-sm">
              and don't forget to adjust auto-refresh to every hour.
            </p>
          </div>
          <div className="mt-8 sm:w-full sm:max-w-md xl:mt-0 xl:ml-8">
            <div className="sm:flex xl:justify-end">
              <a href="webcal://sekai.rayriffy.com/subscribe/virtual-lives.ics">
                <button className="mt-3 w-full flex items-center justify-center px-5 py-3 border border-transparent shadow text-base font-medium rounded-md text-white bg-blue-500 hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-700 focus:ring-white sm:mt-0 sm:w-auto sm:flex-shrink-0">
                  Subscribe
                </button>
              </a>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 xl:gap-8">
          {virtualLives.map(live => (
            <VirtualLiveCard
              key={`virtualLive-${live.id}`}
              virtualLive={live}
            />
          ))}
        </div>
        <div className="pt-4">
          <h2 className="font-bold text-2xl">Beginner Lives</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 xl:gap-8">
          {beginnerLives.map(live => (
            <VirtualLiveCard
              key={`virtualLive-${live.id}`}
              virtualLive={live}
            />
          ))}
        </div>
      </div>
    </Fragment>
  )
}

export const getStaticProps: GetStaticProps<Props> = async context => {
  const { sortBy, reverse, pick } = await import('lodash')

  const { getVirtualLives } = await import('../core/services/getVirtualLives')

  const virtualLives = await getVirtualLives()

  const getLives = (type: 'normal' | 'beginner') =>
    reverse(sortBy(virtualLives, 'startAt'))
      .filter(o => o.virtualLiveType === type)
      .map(live => pick(live, ['id', 'assetbundleName']))

  return {
    props: {
      virtualLives: getLives('normal'),
      beginnerLives: getLives('beginner').reverse(),
    },
  }
}

export default Page
