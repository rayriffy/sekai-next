import { FunctionComponent, memo } from 'react'

import Link from 'next/link'
import Image from 'next/image'

import { Music } from '../../@types/Music'

interface Props {
  music: Music
  disableOverlay?: boolean
}

export const MusicCard: FunctionComponent<Props> = memo(props => {
  const { music, disableOverlay = false } = props

  return (
    <Link href={`/music/${music.id}`}>
      <a>
        <div className="relative rounded-md overflow-hidden">
          {!disableOverlay && (
            <div className="rounded-md absolute top-0 bottom-0 left-0 right-0 bg-black-overlay backdrop-blur transition ease-in-out duration-200 z-10 flex flex-col justify-between text-white p-6 opacity-0 hover:opacity-100">
              <div>
                <h1 className="font-bold text-xl">{music.title}</h1>
                <div className="pt-2 flex space-x-4">
                  {music.categories.map(category => (
                    <div
                      key={`music-${music.id}-category-${category}`}
                      className="bg-green-500 px-2 py-1 uppercase text-xs rounded font-bold"
                    >
                      {category}
                    </div>
                  ))}
                </div>
              </div>
              <div className="pt-1 text-xs sm:text-sm">
                <div>Lyricist: {music.lyricist}</div>
                <div>Composer: {music.composer}</div>
                <div>Arranger: {music.arranger}</div>
              </div>
            </div>
          )}
          <Image
            src={`https://sekai-res.dnaroma.eu/file/sekai-assets/music/jacket/${music.assetbundleName}_rip/${music.assetbundleName}.webp`}
            width={740}
            height={740}
          />
        </div>
      </a>
    </Link>
  )
})
