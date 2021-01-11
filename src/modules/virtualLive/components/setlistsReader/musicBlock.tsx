import { FunctionComponent, memo } from 'react'

import { Audio } from '../../../music/components/audio'

import { Music } from '../../../../@types/Music'
import { MusicVocal } from '../../../../@types/MusicVocal'
import { CharacterStack } from '../../../../core/components/characterStack'

interface Props {
  music: Music
  vocal: MusicVocal
}

export const MusicBlock: FunctionComponent<Props> = memo(props => {
  const { music, vocal } = props

  return (
    <div>
      <div className="flex items-center justify-between pb-2">
        <p className="font-medium">{music.title}</p>
        <div>
          <CharacterStack
            characterIds={vocal.characters.map(o => o.characterId)}
          />
        </div>
      </div>
      <Audio music={music} vocal={vocal} fullVersion className="w-full mt-2" />
    </div>
  )
})
