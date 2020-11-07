import { Fragment } from 'react'

import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import { MusicDetail } from '../../modules/music/components/detail'
import { HeadTitle } from '../../core/components/headTitle'

import { Music } from '../../@types/Music'
import { MusicDifficulty } from '../../@types/MusicDifficulty'
import { MusicTag } from '../../@types/MusicTag'
import { MusicVocal } from '../../@types/MusicVocal'

interface Props {
  music: Music
  difficulties: MusicDifficulty[]
  tags: MusicTag[]
  vocals: MusicVocal[]
}

const Page: NextPage<Props> = props => {
  const { music, difficulties, tags, vocals } = props

  return (
    <Fragment>
      <HeadTitle title={music.title} />
      <MusicDetail {...props} />
      <div className="p-8 space-y-4 bg-gray-200">
        <h1 className="text-gray-900 font-bold text-xl">Debug</h1>
        <div className="bg-gray-200 rounded-lg p-4">
          <h2 className="text-sm uppercase text-gray-900 font-bold">Music</h2>
          <p className="text-gray-600 text-sm break-all pt-2">
            {JSON.stringify(music)}
          </p>
        </div>
        <div className="bg-gray-200 rounded-lg p-4">
          <h2 className="text-sm uppercase text-gray-900 font-bold">
            Difficulties
          </h2>
          <p className="text-gray-600 text-sm break-all pt-2">
            {JSON.stringify(difficulties)}
          </p>
        </div>
        <div className="bg-gray-200 rounded-lg p-4">
          <h2 className="text-sm uppercase text-gray-900 font-bold">Tags</h2>
          <p className="text-gray-600 text-sm break-all pt-2">
            {JSON.stringify(tags)}
          </p>
        </div>
        <div className="bg-gray-200 rounded-lg p-4">
          <h2 className="text-sm uppercase text-gray-900 font-bold">Vocals</h2>
          <p className="text-gray-600 text-sm break-all pt-2">
            {JSON.stringify(vocals)}
          </p>
        </div>
      </div>
    </Fragment>
  )
}

export const getStaticProps: GetStaticProps<Props> = async context => {
  const { getMusics } = await import('../../core/services/getMusics')
  const { getMusicDifficulties } = await import(
    '../../core/services/getMusicDifficulties'
  )
  const { getMusicTags } = await import('../../core/services/getMusicTags')
  const { getMusicVocals } = await import('../../core/services/getMusicVocals')

  const targetId = Number(context.params.id)

  const musics = await getMusics()
  const targetMusic = musics.find(music => music.id === targetId)

  // mass data grinding
  const [difficulties, tags, vocals] = await Promise.all([
    getMusicDifficulties(),
    getMusicTags(),
    getMusicVocals(),
  ])

  // filter by music id
  const targetDifficulties = difficulties.filter(
    difficulty => difficulty.musicId === targetId
  )
  const targetTags = tags.filter(tag => tag.musicId === targetId)
  const targetVocals = vocals.filter(vocal => vocal.musicId === targetId)

  return {
    props: {
      music: targetMusic,
      difficulties: targetDifficulties,
      tags: targetTags,
      vocals: targetVocals,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { getMusics } = await import('../../core/services/getMusics')

  const musics = await getMusics()

  return {
    paths: musics.map(music => ({
      params: {
        id: music.id.toString(),
      },
    })),
    fallback: false,
  }
}

export default Page
