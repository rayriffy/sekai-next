import { FunctionComponent, memo } from 'react'

import { Music } from '../../../@types/Music'
import { MusicCard } from '../../../core/components/musicCard'

interface Props {
  musics: Pick<
    Music,
    | 'title'
    | 'categories'
    | 'lyricist'
    | 'composer'
    | 'arranger'
    | 'assetbundleName'
    | 'id'
  >[]
}

export const MusicsListing: FunctionComponent<Props> = memo(props => {
  const { musics } = props

  return (
    <div className="mx-auto grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {musics.map(music => (
        <MusicCard music={music} key={`music-${music.id}`} />
      ))}
    </div>
  )
})
