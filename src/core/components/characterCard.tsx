import { FunctionComponent, memo } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { getCard } from '../../modules/cards/services/getCard'

import { Card } from '../../@types/Card'

interface Props {
  card: Card
  small?: boolean
}

interface StarProps {
  afterTraining?: boolean
}

export const CharacterCard: FunctionComponent<Props> = memo(props => {
  const { card, small } = props

  return (
    <Link href={`/card/${card.id}`}>
      <a>
        <div className="rounded-lg overflow-hidden relative">
          <div
            className={`z-10 absolute bottom-2 left-2 ${
              small ? 'w-4 md:w-6' : 'w-6 md:w-8'
            }`}
          >
            {Array.from({ length: card.rarity }).map((_, i) => (
              <Star
                key={`card-${card.id}-star-${i}`}
                afterTraining={card.rarity >= 3}
              />
            ))}
          </div>
          <div
            className={`z-10 absolute top-2 right-2 ${
              small ? 'w-6' : 'w-6 md:w-8'
            }`}
          >
            <Image
              src={`/static/icon_attribute_${card.attr}.png`}
              width={88}
              height={88}
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
      </a>
    </Link>
  )
})

export const Star: FunctionComponent<StarProps> = memo(props => {
  const { afterTraining } = props

  return (
    <Image
      src={`/static/rarity_star_${
        afterTraining ? 'afterTraining' : 'normal'
      }.png`}
      width={72}
      height={70}
    />
  )
})
