import { FunctionComponent, memo, useEffect } from 'react'

import { OverviewCard } from './overviewCard'

import { Card } from '../../../@types/Card'
import { CharacterProfile } from '../../../@types/CharacterProfile'
import { GameCharacter } from '../../../@types/GameCharacter'
import { Music } from '../../../@types/Music'
import { GameCharacterUnit } from '../../../@types/GameCharacterUnit'
import { MusicCard } from '../../../core/components/musicCard'
import { CharacterCard } from '../../../core/components/characterCard'

interface Props {
  character: GameCharacter
  profile: CharacterProfile
  musics: Music[]
  cards: Card[]
  characterUnit: GameCharacterUnit
}

export const CharacterDetail: FunctionComponent<Props> = memo(props => {
  const { character, profile, musics, cards, characterUnit } = props

  useEffect(() => {
    console.log(props)
  }, [])

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <OverviewCard {...{ character, characterUnit, profile }} />
      <div className="pt-8 grid grid-cols-1 gap-8">
        <div className="bg-white rounded-lg">
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Musics
            </h3>
            <p className="mt-1 text-sm leading-5 text-gray-500">
              This also includes <b>アナザーボーカルver.</b> as well!
            </p>
          </div>
          <div className="px-4 py-5 sm:px-6">
            <div className="overflow-x-scroll flex space-x-4">
              {musics.map(music => (
                <MusicCard className="w-64 h-64" {...{ music }} />
              ))}
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg">
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Cards
            </h3>
          </div>
          <div className="px-4 py-5 sm:px-6">
            <div className="overflow-x-scroll flex space-x-4">
              {cards.map(card => (
                <CharacterCard
                  card={card}
                  className="w-72"
                  afterTraining={card.rarity >= 3}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})
