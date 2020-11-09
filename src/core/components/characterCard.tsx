import { FunctionComponent, memo, useMemo } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { getCard } from '../../modules/cards/services/getCard'

import { Card } from '../../@types/Card'

interface Props {
  card: Card
  afterTraining?: boolean
  disableLink?: boolean
  original?: boolean
}

interface StarProps {
  afterTraining?: boolean
}

export const CharacterCard: FunctionComponent<Props> = props => {
  const {
    card,
    afterTraining = false,
    disableLink = false,
    original = false,
  } = props

  const cardNode = useMemo(
    () => (
      <div className="rounded-lg overflow-hidden relative">
        <div className="z-10 absolute bottom-2 left-2 w-1/12">
          {Array.from({ length: card.rarity }).map((_, i) => (
            <Star
              key={`card-${card.id}-star-${i}-mode-${
                afterTraining ? 'afterTraining' : 'normal'
              }`}
              afterTraining={afterTraining}
            />
          ))}
        </div>
        <div className="z-10 absolute top-2 right-2 w-1/12">
          <Image
            src={`/static/icon_attribute_${card.attr}.png`}
            width={44}
            height={44}
            alt={card.attr}
          />
        </div>
        <div className="z-10 absolute top-0 bottom-0 left-0 right-0">
          <Image
            src={`/static/frame/cardFrame_L_${card.rarity}.png`}
            width={original ? 2048 : 600}
            height={original ? 1261 : (600 * 1261) / 2048}
            alt="Card Frame"
          />
        </div>
        <Image
          key={`card-${card.id}-mode-${
            afterTraining ? 'afterTraining' : 'normal'
          }`}
          src={getCard(card.assetbundleName, afterTraining)}
          width={600}
          height={(600 * 1261) / 2048}
          alt={card.prefix}
        />
      </div>
    ),
    [afterTraining]
  )

  if (disableLink) {
    return cardNode
  } else {
    return (
      <Link href={`/card/${card.id}`}>
        <a>{cardNode}</a>
      </Link>
    )
  }
}

export const Star: FunctionComponent<StarProps> = memo(props => {
  const { afterTraining } = props

  return (
    <Image
      src={`/static/rarity_star_${
        afterTraining ? 'afterTraining' : 'normal'
      }.png`}
      width={46}
      height={(46 * 70) / 72}
      alt="Star"
    />
  )
})
