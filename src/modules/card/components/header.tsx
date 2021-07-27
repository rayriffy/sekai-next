import { FunctionComponent, memo } from 'react'

import Image from 'next/image'

import { getUnitBanner } from '../../characters/services/getUnitBanner'

import { Card } from '../../../@types/Card'
import { GameCharacter } from '../../../@types/GameCharacter'

interface Props {
  card: Pick<Card, 'prefix'>
  character: Pick<GameCharacter, 'firstName' | 'givenName' | 'unit'>
}

export const Header: FunctionComponent<Props> = memo(props => {
  const { card, character } = props

  return (
    <div className="flex pb-2 space-x-2">
      <div className="w-32 h-auto p-2 relative">
        <Image src={getUnitBanner(character.unit)} width={620} height={260} />
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
