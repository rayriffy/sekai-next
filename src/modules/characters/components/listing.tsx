import { FunctionComponent, memo } from 'react'

import Link from 'next/link'
import Image from 'next/image'

import { GameCharacter } from '../../../@types/GameCharacter'
import { UnitProfile } from '../../../@types/UnitProfile'
import { getCharacterBanner } from '../services/getCharacterBanner'
import { getUnitBanner } from '../services/getUnitBanner'

interface Props {
  grouppedGameCharacters: {
    unit: UnitProfile
    characters: GameCharacter[]
  }[]
}

export const CharactersListing: FunctionComponent<Props> = memo(props => {
  const { grouppedGameCharacters } = props

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-end p-6">
      {grouppedGameCharacters.map(chunk => (
        <div key={`character-unit-${chunk.unit.unit}`}>
          <div className="flex justify-center pt-2 pb-6">
            <div className="w-64 h-auto relative">
              <Image
                src={getUnitBanner(chunk.unit.unit)}
                width={620}
                height={260}
              />
            </div>
          </div>
          <div
            className={`max-w-4xl mx-auto grid gap-6 grid-cols-2 ${
              chunk.characters.length === 4
                ? 'sm:grid-cols-4'
                : 'sm:grid-cols-4 md:grid-cols-6'
            }`}
          >
            {chunk.characters.map(character => (
              <div className="col-span-1" key={`character-${character.id}`}>
                <Link href={`/character/${character.id}`}>
                  <a>
                    <Image
                      src={getCharacterBanner(character.id)}
                      width={character.unit === 'piapro' ? 240 : 320}
                      height={620}
                    />
                  </a>
                </Link>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
})
