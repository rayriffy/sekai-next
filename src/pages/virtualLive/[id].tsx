import { Fragment } from 'react'

import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import { HeadTitle } from '../../core/components/headTitle'
import { VirtualLiveDetail } from '../../modules/virtualLive/components/detail'

import { VirtualLive } from '../../@types/VirtualLive'
import { TransformedSetlist } from '../../@types/TransformedSetlist'

interface Props {
  virtualLive: VirtualLive
  setlists: TransformedSetlist[]
  character3dIndex: {
    id: number
    charId: number
  }[]
}

const Page: NextPage<Props> = props => {
  const { virtualLive } = props

  return (
    <Fragment>
      <HeadTitle title={virtualLive.name} />
      <VirtualLiveDetail {...props} />
    </Fragment>
  )
}

export const getStaticProps: GetStaticProps<Props> = async context => {
  const { default: _ } = await import('lodash')

  const { sortBy, flatMapDeep } = _

  const { getVirtualLives } = await import(
    '../../core/services/getVirtualLives'
  )
  const { getMCScenario } = await import('../../core/services/getMCScenario')
  const { getMusics } = await import('../../core/services/getMusics')
  const { getMusicVocals } = await import('../../core/services/getMusicVocals')
  const { getCharacter3ds } = await import(
    '../../core/services/getCharacter3ds'
  )

  const targetId = Number(context.params.id)

  const virtualLives = await getVirtualLives()
  const targetVirtualLive = virtualLives.find(music => music.id === targetId)

  // mass data grinding
  const [musics, musicVocals, character3ds] = await Promise.all([
    getMusics(),
    getMusicVocals(),
    getCharacter3ds(),
  ])

  const setlists: TransformedSetlist[] = await Promise.all(
    targetVirtualLive.virtualLiveSetlists.map(async setlist => {
      if (setlist.virtualLiveSetlistType === 'mc') {
        const mcSerials = await getMCScenario(setlist.assetbundleName)

        return {
          seq: setlist.seq,
          type: 'mc' as 'mc',
          data: mcSerials,
        }
      } else {
        return {
          seq: setlist.seq,
          type: 'music' as 'music',
          data: {
            music: musics.find(o => o.id === setlist.musicId),
            vocal: musicVocals.find(o => o.id === setlist.musicVocalId),
          },
        }
      }
    })
  )

  // get used 3ds character id for conversion with character ids
  const targetCharacter3ds = flatMapDeep(
    setlists
      .filter(o => o.type === 'mc')
      .map(o => {
        if (o.type === 'mc') {
          return o.data.serialData.map(p => p.data.Character3dId)
        } else {
          throw 'invalid-type'
        }
      })
  )

  return {
    props: {
      virtualLive: targetVirtualLive,
      setlists: sortBy(setlists, 'seq'),
      character3dIndex: character3ds
        .filter(o => targetCharacter3ds.includes(o.id))
        .map(o => ({
          id: o.id,
          charId: o.characterId,
        })),
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
