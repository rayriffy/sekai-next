import { Fragment } from 'react'

import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import { HeadTitle } from '../../core/components/headTitle'
import { EventDetail } from '../../modules/event/detail'

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
      <EventDetail {...props} />
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
