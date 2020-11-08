import { Fragment } from 'react'

import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import { HeadTitle } from '../../core/components/headTitle'

import { Event } from '../../@types/Event'

interface Props {
  event: Event
}

const Page: NextPage<Props> = props => {
  const { event } = props

  return (
    <Fragment>
      <HeadTitle title={event.name} />
      <div className="p-8 text-sm text-gray-900">{JSON.stringify(props)}</div>
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
