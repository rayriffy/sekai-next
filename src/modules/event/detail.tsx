import { FunctionComponent } from 'react'

import dayjs from 'dayjs'

import { EventCard } from '../../core/components/eventCard'

import { Event } from '../../@types/Event'
import { Honor } from '../../@types/Honor'
import { ResourceBox } from '../../@types/ResourceBox'

interface Props {
  event: Event
  honors: Honor[]
  resourceBoxes: ResourceBox[]
}

export const EventDetail: FunctionComponent<Props> = props => {
  const { event, honors, resourceBoxes } = props

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="col-span-1 md:col-span-2">
          <EventCard event={event} disableSlug />
        </div>
        <div className="col-span-1 md:col-span-3 space-y-2">
          <h1 className="text-gray-900 font-bold text-2xl">{event.name}</h1>
          <div>
            <p>
              Event start at{' '}
              <b>{dayjs(event.startAt).format('DD MMMM YYYY HH:MM')}</b>
            </p>
            <p>
              Event ended at{' '}
              <b>{dayjs(event.aggregateAt).format('DD MMMM YYYY HH:MM')}</b>
            </p>
          </div>
        </div>
      </div>
      <div className="pt-6">
        <h2 className="font-bold text-2xl">Rewards</h2>
      </div>
    </div>
  )
}
