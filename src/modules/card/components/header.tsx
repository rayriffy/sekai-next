import { FunctionComponent, memo } from 'react'

import Image from 'next/image'

import { getUnitBanner } from '../../characters/services/getUnitBanner'

import { Card } from '../../../@types/Card'
import { GameCharacter } from '../../../@types/GameCharacter'

interface Props {
  card: Card
  character: GameCharacter
}

export const Header: FunctionComponent<Props> = memo(props => {
  const { card, character } = props

  return (
    <div className="flex pb-2 space-x-2">
      <div className="w-32 p-2">
        <Image src={getUnitBanner(character.unit)} unsized />
      </div>
      <div className="w-full text-gray-900 font-semibold">
        <h2 className="text-md border-b-4 border-teal-400 border-dotted">
          {card.prefix}
        </h2>
        <h1 className="text-xl">
          {character.firstName}
          {character.givenName}
        </h1>
      </div>
    </div>
  )
})
