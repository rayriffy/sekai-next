import { FunctionComponent, memo } from 'react'

import Image from 'next/image'

import { Vocals } from './vocals'
import { DescriptionCard } from './descriptionCard'
import { Difficulties } from './difficulties'
import { getMusicCover } from '../../musics/services/getMusicCover'
import { getUnitBanner } from '../../characters/services/getUnitBanner'

import { Music } from '../../../@types/Music'
import { MusicDifficulty } from '../../../@types/MusicDifficulty'
import { MusicVocal } from '../../../@types/MusicVocal'
import { Unit } from '../../../@types/Unit'

interface Props {
  music: Pick<
    Music,
    | 'id'
    | 'categories'
    | 'title'
    | 'composer'
    | 'assetbundleName'
    | 'lyricist'
    | 'arranger'
    | 'publishedAt'
  >
  difficulties: Pick<
    MusicDifficulty,
    'id' | 'musicDifficulty' | 'playLevel' | 'noteCount'
  >[]
  vocals: Pick<
    MusicVocal,
    'id' | 'caption' | 'characters' | 'assetbundleName'
  >[]
  unitProfiles: Unit[]
}

export const MusicDetail: FunctionComponent<Props> = memo(props => {
  const { music, difficulties, vocals, unitProfiles } = props

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto block sm:grid sm:grid-cols-3 py-8 gap-8">
        <div className="col-span-1">
          <Image
            src={getMusicCover(music.assetbundleName)}
            className="rounded-lg"
            width={740}
            height={740}
          />
        </div>
        <div className="col-span-2 space-y-2 pt-4 md:pt-0">
          <h1 className="text-4xl font-bold text-gray-900">{music.title}</h1>
          <div className="flex space-x-4 flex-wrap border-b py-4 border-gray-200">
            {unitProfiles.map(unit => (
              <div key={`music-unit-${unit}`} className="w-36">
                <Image src={getUnitBanner(unit)} width={620} height={260} />
              </div>
            ))}
          </div>
          <Difficulties musicId={music.id} difficulties={difficulties} />
        </div>
      </div>
      <div className="space-y-4 max-w-4xl mx-auto">
        <Vocals vocals={vocals} music={music} />
      </div>
      <DescriptionCard music={music} />
    </div>
  )
})
