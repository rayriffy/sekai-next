import {
  FunctionComponent,
  memo,
  DetailedHTMLProps,
  HTMLAttributes,
} from 'react'

import Link from 'next/link'
import Image from 'next/image'

import { getMusicCover } from '../../modules/musics/services/getMusicCover'

import { Music } from '../../@types/Music'

interface Props
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  music: Music
  disableOverlay?: boolean
  sizes?: string
  priority?: boolean
}

export const MusicCard: FunctionComponent<Props> = memo(props => {
  const {
    music,
    disableOverlay = false,
    sizes,
    className,
    priority = false,
    ...rest
  } = props

  return (
    <Link href={`/music/${music.id}`}>
      <a>
        <div className={`relative ${className}`} {...rest}>
          {!disableOverlay && (
            <div className="rounded-md absolute top-0 bottom-1 left-0 right-0 bg-black-overlay backdrop-blur transition ease-in-out duration-200 z-10 flex flex-col justify-between text-white p-6 opacity-0 hover:opacity-100">
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
            src={getMusicCover(music.assetbundleName)}
            className="rounded-md"
            width={740}
            height={740}
            sizes={sizes}
            alt={music.title}
            priority={priority}
          />
        </div>
      </a>
    </Link>
  )
})
