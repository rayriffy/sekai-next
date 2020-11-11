import { FunctionComponent, memo, useMemo } from 'react'

import Link from 'next/link'
import Image from 'next/image'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import {
  getEventBackground,
  getEventLogo,
} from '../../modules/events/services/getEvent'

import { Event } from '../../@types/Event'

interface Props {
  event: Event
  disableSlug?: boolean
}

interface DateSlugProps {
  startAt: number
  aggregateAt: number
}

export const EventCard: FunctionComponent<Props> = memo(props => {
  const { event, disableSlug = false } = props

  return (
    <Link href={`/event/${event.id}`}>
      <a>
        <div className="relative rounded-md overflow-hidden">
          {!disableSlug && (
            <DateSlug startAt={event.startAt} aggregateAt={event.aggregateAt} />
          )}
          <div className="absolute bottom-4 left-2 z-10 w-1/2">
            <Image
              src={getEventLogo(event.assetbundleName)}
              width={600}
              height={300}
              sizes="300px"
              alt={`${event.name} Logo`}
            />
          </div>
          <Image
            src={getEventBackground(event.assetbundleName)}
            width={2048}
            height={1261}
            sizes="600px"
            alt={`${event.name} Background`}
          />
        </div>
      </a>
    </Link>
  )
})

const DateSlug: FunctionComponent<DateSlugProps> = memo(props => {
  const { startAt, aggregateAt } = props

  const eventStatus = useMemo(() => {
    dayjs.extend(relativeTime)

    const currentTime = dayjs()
    const eventStarted = dayjs(startAt)
    const eventEnded = dayjs(aggregateAt)

    if (currentTime.isAfter(eventStarted) && currentTime.isBefore(eventEnded)) {
      return {
        code: 0,
        text: 'Ongoing',
      }
    } else if (currentTime.isBefore(eventStarted)) {
      return {
        code: 1,
        text: `Staring ${dayjs(eventStarted).toNow()}`,
      }
    } else {
      return {
        code: 2,
        text: `Ended ${dayjs(eventEnded).fromNow()}`,
      }
    }
  }, [])

  return (
    <div
      className={`absolute top-0 right-0 z-10 px-2 py-1 text-sm font-bold text-white rounded-bl-md uppercase ${
        eventStatus.code === 0
          ? 'bg-green-600'
          : eventStatus.code === 1
          ? 'bg-blue-600'
          : 'bg-orange-600'
      }`}
    >
      {eventStatus.text}
    </div>
  )
})
