import { FunctionComponent, memo, useMemo, Fragment } from 'react'

import Image from 'next/image'

import dayjs from 'dayjs'

import { SetlistsReader } from './setlistsReader'
import { ScheduleBlock } from './scheduleBlock'

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

  const isBeginnerLive = useMemo(() => !['normal', 'cheerful_carnival'].includes(virtualLive.virtualLiveType), [virtualLive.virtualLiveType])

  const diffSeconds = useMemo(() => {
    if (!isBeginnerLive) {
      const schedule = virtualLive.virtualLiveSchedules[0]

      return dayjs(schedule.endAt).diff(dayjs(schedule.startAt), 'second')
    } else {
      const schedule = virtualLive.virtualLiveBeginnerSchedules[0]

      const getDayJsByTimeString = (input: string) => {
        const chunk = input.split(':')

        return dayjs('2000-06-22T00:00:00.000Z')
          .hour(Number(chunk[0]))
          .minute(Number(chunk[1]))
          .second(Number(chunk[2]))
      }

      return getDayJsByTimeString(schedule.endTime).diff(
        getDayJsByTimeString(schedule.startTime),
        'second'
      )
    }
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
            {!isBeginnerLive ? (
              <Fragment>
                <p>
                  First live begins at{' '}
                  <b>
                    {dayjs(virtualLive.virtualLiveSchedules[0].startAt).format(
                      'DD MMMM YYYY HH:MM'
                    )}
                  </b>
                </p>
                <p>
                  Last live begins at{' '}
                  <b>
                    {dayjs(
                      virtualLive.virtualLiveSchedules[
                        virtualLive.virtualLiveSchedules.length - 1
                      ].startAt
                    ).format('DD MMMM YYYY HH:MM')}
                  </b>
                </p>
              </Fragment>
            ) : (
              <p>
                Live will be held on{' '}
                <b className="capitalize">
                  {virtualLive.virtualLiveBeginnerSchedules[0].dayOfWeek}
                </b>
              </p>
            )}
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
              {!isBeginnerLive
                ? virtualLive.virtualLiveSchedules.map(schedule => (
                    <ScheduleBlock
                      key={`vlive-schedule-${schedule.id}`}
                      time={dayjs(schedule.startAt).format('HH:MM')}
                      date={dayjs(schedule.startAt).format('DD MMM')}
                    />
                  ))
                : virtualLive.virtualLiveBeginnerSchedules.map(schedule => (
                    <ScheduleBlock
                      key={`vlive-schedule-beginner-${schedule.id}`}
                      time={schedule.startTime.slice(0, 5)}
                      date={schedule.dayOfWeek}
                    />
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
