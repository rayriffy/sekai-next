import { FunctionComponent, memo, useMemo } from 'react'

import Link from 'next/link'
import Image from 'next/image'

import moment from 'moment'

import {
  getEventBackground,
  getEventLogo,
} from '../../modules/events/services/getEvent'

import { Event } from '../../@types/Event'

interface Props {
  event: Event
  original?: boolean
}

export const EventCard: FunctionComponent<Props> = memo(props => {
  const { event, original = false } = props

  const eventStatus = useMemo(() => {
    const currentTime = moment()
    const eventStarted = moment(event.startAt)
    const eventEnded = moment(event.aggregateAt)

    if (currentTime.isAfter(eventStarted) && currentTime.isBefore(eventEnded)) {
      return {
        code: 0,
        text: 'Ongoing',
      }
    } else if (currentTime.isBefore(eventStarted)) {
      return {
        code: 1,
        text: `Staring ${moment(eventStarted).fromNow()}`,
      }
    } else {
      return {
        code: 2,
        text: `Ended ${moment(eventEnded).fromNow()}`,
      }
    }
  }, [])

  return (
    <Link href={`/event/${event.id}`}>
      <a>
        <div className="relative rounded-md overflow-hidden">
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
          <div className="absolute bottom-4 left-2 z-10 w-1/2">
            <Image
              src={getEventLogo(event.assetbundleName)}
              alt={`${event.name} Logo`}
              unsized
            />
          </div>
          <Image
            src={getEventBackground(event.assetbundleName)}
            width={original ? 2048 : 600}
            height={original ? 1261 : (600 * 1261) / 2048}
            alt={`${event.name} Background`}
          />
        </div>
      </a>
    </Link>
  )
})
