import { GetStaticProps, NextPage } from 'next'
import Image from 'next/image'

import { Music } from '../@types/Music'

interface Props {
  musics: Music[]
}

const Page: NextPage<Props> = props => {
  const { musics } = props

  // console.log(musics)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="font-bold text-2xl">Hello</h1>
      <div className="grid grid-cols-4 gap-4">
        {musics.map(music => (
          <div
            className="relative rounded-md overflow-hidden"
            key={`music-${music.id}`}
          >
            {/* <div className="absolute top-0 bottom-0 left-0 right-0 bg-black-overlay backdrop-blur"></div> */}
            <Image
              src={`https://sekai-res.dnaroma.eu/file/sekai-assets/music/jacket/${music.assetbundleName}_rip/${music.assetbundleName}.webp`}
              width={740}
              height={740}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps<Props> = async context => {
  const { default: axios } = await import('axios')

  const res = await axios.get<Music[]>(
    'https://raw.githubusercontent.com/Sekai-World/sekai-master-db-diff/master/musics.json'
  )

  return {
    props: {
      musics: res.data,
    },
  }
}

export default Page
