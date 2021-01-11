import { Fragment } from 'react'

import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import { HeadTitle } from '../../core/components/headTitle'

import { VirtualLive } from '../../@types/VirtualLive'

interface Props {
  virtualLive: VirtualLive
}

const Page: NextPage<Props> = props => {
  const { virtualLive } = props

  return (
    <Fragment>
      <HeadTitle title={virtualLive.name} />
      <div>{JSON.stringify(virtualLive)}</div>
    </Fragment>
  )
}

export const getStaticProps: GetStaticProps<Props> = async context => {
  const { getVirtualLives } = await import(
    '../../core/services/getVirtualLives'
  )

  const targetId = Number(context.params.id)

  const virtualLives = await getVirtualLives()
  const targetVirtualLive = virtualLives.find(music => music.id === targetId)

  // mass data grinding
  // const [difficulties, tags, vocals, unitProfiles] = await Promise.all([
  //   getMusicDifficulties(),
  //   getMusicTags(),
  //   getMusicVocals(),
  //   getUnitProfiles(),
  // ])

  return {
    props: {
      virtualLive: targetVirtualLive,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { getVirtualLives } = await import(
    '../../core/services/getVirtualLives'
  )

  const virtualLives = await getVirtualLives()

  return {
    paths: virtualLives.map(live => ({
      params: {
        id: live.id.toString(),
      },
    })),
    fallback: false,
  }
}

export default Page
