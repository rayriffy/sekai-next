import { FunctionComponent, memo } from 'react'

import Image from 'next/image'

import { Vocals } from './vocals'
import { DescriptionCard } from './descriptionCard'

import { Music } from '../../../@types/Music'
import { MusicDifficulty } from '../../../@types/MusicDifficulty'
import { MusicTag } from '../../../@types/MusicTag'
import { MusicVocal } from '../../../@types/MusicVocal'

interface Props {
  music: Music
  difficulties: MusicDifficulty[]
  tags: MusicTag[]
  vocals: MusicVocal[]
}

export const MusicDetail: FunctionComponent<Props> = memo(props => {
  const { music, difficulties, tags, vocals } = props

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto block sm:grid sm:grid-cols-3 py-8 gap-8">
        <div className="col-span-1">
          <Image
            src={`https://sekai-res.dnaroma.eu/file/sekai-assets/music/jacket/${music.assetbundleName}_rip/${music.assetbundleName}.webp`}
            className="rounded-lg"
            width={740}
            height={740}
          />
        </div>
        <div className="col-span-2 space-y-2 pt-4 md:pt-0">
          <h1 className="text-4xl font-bold text-gray-900">{music.title}</h1>
          <div className="flex space-x-4 flex-wrap">
            {tags.map(tag => (
              <div
                key={`music-tag-${tag.id}`}
                className="bg-blue-500 px-2 py-1 rounded-md text-white text-xs font-bold uppercase"
              >
                {tag.musicTag}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="space-y-4 max-w-4xl mx-auto">
        <Vocals vocals={vocals} music={music} />
      </div>
      <DescriptionCard music={music} />
    </div>
  )
})
