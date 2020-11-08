import { FunctionComponent, memo } from 'react'

import Image from 'next/image'

import { getCard } from '../../modules/cards/services/getCard'

import { Card } from '../../@types/Card'

interface Props {
  card: Card
}

export const CharacterCard: FunctionComponent<Props> = props => {
  const { card } = props

  return (
    <div className="rounded-lg overflow-hidden relative">
      <div className="z-10 absolute top-2 right-2">
        <Image
          className="w-6 h-6 md:w-8 md:h-8"
          src={`/static/icon_attribute_${card.attr}.png`}
          unsized
        />
      </div>
      <div className="z-10 absolute top-0 bottom-0 left-0 right-0">
        <Image
          src={`/static/frame/cardFrame_L_${card.rarity}.png`}
          width={2048}
          height={1261}
        />
      </div>
      <Image
        src={getCard(card.assetbundleName, card.rarity >= 3)}
        width={2048}
        height={1261}
      />
    </div>
  )
}
