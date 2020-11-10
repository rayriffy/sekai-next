import { Fragment } from 'react'

import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import dayjs from 'dayjs'

import { HeadTitle } from '../../core/components/headTitle'
import { EventCard } from '../../core/components/eventCard'

import { Event } from '../../@types/Event'

interface Props {
  event: Event
}

const Page: NextPage<Props> = props => {
  const { event } = props

  return (
    <Fragment>
      <HeadTitle title={event.name} />
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-5 gap-6">
          <div className="col-span-2">
            <EventCard event={event} disableSlug />
          </div>
          <div className="col-span-3 space-y-2">
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
      </div>
    </Fragment>
  )
}

export const getStaticProps: GetStaticProps<Props> = async context => {
  const { getEvents } = await import('../../core/services/getEvents')

  const targetId = Number(context.params.id)

  const characters = await getEvents()
  const targetEvent = characters.find(event => event.id === targetId)

  return {
    props: {
      event: targetEvent,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { getEvents } = await import('../../core/services/getEvents')

  const events = await getEvents()

  return {
    paths: events.map(event => ({
      params: {
        id: event.id.toString(),
      },
    })),
    fallback: false,
  }
}

export default Page
