import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import { Music } from '../../@types/Music'

interface Props {
  music: Music
}

const Page: NextPage<Props> = props => {
  const { music } = props

  return (
    <div className="p-8">
      <div className="bg-gray-200 rounded-lg p-4">
        <h2 className="text-sm uppercase text-gray-900 font-bold">Music</h2>
        <p className="text-gray-600 text-sm break-all pt-2">
          {JSON.stringify(music)}
        </p>
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps<Props> = async context => {
  const { getMusics } = await import('../../modules/musics/services/getMusics')

  const musics = await getMusics()
  const targetMusic = musics.find(
    music => music.id === Number(context.params.id)
  )

  return {
    props: {
      music: targetMusic,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { getMusics } = await import('../../modules/musics/services/getMusics')

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
