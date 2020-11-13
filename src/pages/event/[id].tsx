import { Fragment } from 'react'

import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import dayjs from 'dayjs'

import { HeadTitle } from '../../core/components/headTitle'
import { EventCard } from '../../core/components/eventCard'

import { Event } from '../../@types/Event'
import { Honor } from '../../@types/Honor'
import { ResourceBox } from '../../@types/ResourceBox'

interface Props {
  event: Event
  honors: Honor[]
  resourceBoxes: ResourceBox[]
}

const Page: NextPage<Props> = props => {
  const { event, honors, resourceBoxes } = props

  // console.log('event', event)
  // console.log('honors', honors)
  // console.log('resourceBoxes', resourceBoxes)

  return (
    <Fragment>
      <HeadTitle title={event.name} />
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
              OK
            </div>
          </div>
        </div>
        <div className="pt-6">
          <h2 className="font-bold text-2xl">Rewards</h2>
        </div>
      </div>
    </Fragment>
  )
}

export const getStaticProps: GetStaticProps<Props> = async context => {
  const { getEvents } = await import('../../core/services/getEvents')

  const { getHonors } = await import('../../core/services/getHonors')
  const { getResourceBoxes } = await import(
    '../../core/services/getResourceBoxes'
  )

  const targetId = Number(context.params.id)

  const characters = await getEvents()
  const targetEvent = characters.find(event => event.id === targetId)

  // get resource boxes to refer to honor id
  const resourceBoxes = await getResourceBoxes()
  const targetResourceBoxes = resourceBoxes.filter(
    resourceBox =>
      resourceBox.resourceBoxPurpose === 'event_ranking_reward' &&
      targetEvent.eventRankingRewardRanges
        .map(
          eventRankingRewardRange =>
            eventRankingRewardRange.eventRankingRewards[0].resourceBoxId
        )
        .includes(resourceBox.id)
  )

  // honor id is tied to resource id, which in resource box id, not id in eventRankingRewardRange
  const honors = await getHonors()
  const targetHonors = await honors.filter(honor =>
    targetResourceBoxes
      .filter(targetResourceBox =>
        targetResourceBox.details
          .map(detail => detail.resourceType)
          .includes('honor')
      )
      .map(
        targetResourceBox =>
          targetResourceBox.details.find(
            detail => detail.resourceType === 'honor'
          ).resourceId
      )
      .includes(honor.id)
  )

  return {
    props: {
      event: targetEvent,
      honors: targetHonors,
      resourceBoxes: targetResourceBoxes,
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
