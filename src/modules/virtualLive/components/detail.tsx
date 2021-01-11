import { FunctionComponent, memo, useMemo } from 'react'

import Image from 'next/image'

import dayjs from 'dayjs'

import { SetlistsReader } from './setlistsReader'

import { VirtualLive } from '../../../@types/VirtualLive'
import { TransformedSetlist } from '../../../@types/TransformedSetlist'

interface Props {
  virtualLive: VirtualLive
  setlists: TransformedSetlist[]
  character3dIndex: {
    id: number
    charId: number
  }[]
}

export const VirtualLiveDetail: FunctionComponent<Props> = memo(props => {
  const { virtualLive, setlists, character3dIndex } = props

  const diffSeconds = useMemo(() => {
    const schedule = virtualLive.virtualLiveSchedules[0]

    return dayjs(schedule.endAt).diff(dayjs(schedule.startAt), 'second')
  }, [])

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="col-span-1 lg:col-span-2">
          {/* <EventCard event={event} disableSlug /> */}
          <Image
            width={790}
            height={243}
            src={`https://sekai-res.dnaroma.eu/file/sekai-assets/virtual_live/select/banner/${virtualLive.assetbundleName}_rip/${virtualLive.assetbundleName}.png`}
            className="w-full h-auto"
          />
        </div>
        <div className="col-span-1 lg:col-span-3 space-y-2">
          <h1 className="text-gray-900 font-bold text-2xl">
            {virtualLive.name}
          </h1>
          <div>
            <p>
              Live begins at{' '}
              <b>{dayjs(virtualLive.startAt).format('DD MMMM YYYY HH:MM')}</b>
            </p>
            <p>
              Live ended at{' '}
              <b>{dayjs(virtualLive.endAt).format('DD MMMM YYYY HH:MM')}</b>
            </p>
            <p>
              Duration{' '}
              <b>
                {Math.floor(diffSeconds / 60)} minutes {diffSeconds % 60}{' '}
                seconds
              </b>
            </p>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <div className="bg-white shadow overflow-hidden rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Schedules
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Time will be shown based on timezone of your device
            </p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:py-4">
            <div className="grid gap-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
              {virtualLive.virtualLiveSchedules.map(schedule => (
                <div
                  key={`vlive-schedule-${schedule.id}`}
                  className="rounded-lg border-2 border-emerald-100 bg-yellow-50 p-3 text-center text-gray-900"
                >
                  <h2 className="font-bold text-lg">
                    {dayjs(schedule.startAt).format('HH:MM')}
                  </h2>
                  <h3 className="font-medium text-sm">
                    {dayjs(schedule.startAt).format('DD MMM')}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <div className="bg-white shadow overflow-hidden rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Script
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Read scripts of virtual live here
            </p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5">
            <SetlistsReader
              liveEndAt={virtualLive.endAt}
              {...{ character3dIndex, setlists }}
            />
          </div>
        </div>
      </div>
    </div>
  )
})
