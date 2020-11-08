import { FunctionComponent, memo } from 'react'

import Link from 'next/link'
import Image from 'next/image'

import { GameCharacter } from '../../../@types/GameCharacter'
import { UnitProfile } from '../../../@types/UnitProfile'
import { getCharacterBanner } from '../services/getCharacterBanner'

interface Props {
  unitProfiles: UnitProfile[]
  gameCharacters: GameCharacter[]
}

export const CharactersListing: FunctionComponent<Props> = memo(props => {
  const { gameCharacters, unitProfiles } = props

  return (
    <div className="grid grid-cols-5 gap-8">
      {gameCharacters.map(gameCharacter => (
        <div className="col-span-1" key={`character-${gameCharacter.id}`}>
          <Link href={`/character/${gameCharacter.id}`}>
            <a>
              <Image
                src={getCharacterBanner(gameCharacter.id)}
                width={gameCharacter.unit === 'piapro' ? 240 : 320}
                height={620}
              />
            </a>
          </Link>
        </div>
      ))}
    </div>
  )
})
