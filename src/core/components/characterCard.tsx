import {
  FunctionComponent,
  memo,
  useMemo,
  DetailedHTMLProps,
  HTMLAttributes,
} from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { getCard } from '../../modules/cards/services/getCard'

import { Card } from '../../@types/Card'
import { ProcessedCardRarityType } from '../services/getCardRarity'

interface Props
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  card: Pick<Card, 'id' | 'attr' | 'assetbundleName' | 'prefix'>
  cardRarity: ProcessedCardRarityType
  afterTraining?: boolean
  disableLink?: boolean
  cardSizes?: string
  iconSizes?: string
  priority?: boolean
}

interface StarProps {
  afterTraining?: boolean
  iconSizes?: string
  birthday?: boolean
}

export const CharacterCard: FunctionComponent<Props> = props => {
  const {
    card,
    afterTraining = false,
    disableLink = false,
    cardSizes,
    iconSizes,
    cardRarity,
    priority = false,
    className,
    ...rest
  } = props

  const cardNode = useMemo(
    () => (
      <div
        className={`rounded-lg overflow-hidden relative ${className}`}
        {...rest}
      >
        <div className="z-10 absolute bottom-2 left-2 w-1/13">
          {Array.from({
            length: cardRarity.birthday ? 1 : cardRarity.level,
          }).map((_, i) => (
            <Star
              key={`card-${card.id}-star-${i}-mode-${
                cardRarity.birthday
                  ? 'birthday'
                  : afterTraining
                  ? 'afterTraining'
                  : 'normal'
              }`}
              iconSizes={iconSizes}
              afterTraining={afterTraining}
              birthday={cardRarity.birthday}
            />
          ))}
        </div>
        <div className="z-10 absolute top-2 right-2 w-1/13">
          <Image
            src={`/static/icon_attribute_${card.attr}.png`}
            width={88}
            height={88}
            sizes={iconSizes}
            alt={card.attr}
          />
        </div>
        <div className="absolute top-0 bottom-1 left-0 right-0 overflow-hidden rounded-lg">
          <Image
            key={`card-${card.id}-mode-${
              afterTraining ? 'afterTraining' : 'normal'
            }`}
            src={getCard(
              card.assetbundleName,
              afterTraining,
              cardRarity.birthday
            )}
            width={2048}
            height={1261}
            sizes={cardSizes}
            alt={card.prefix}
            priority={priority}
          />
        </div>
        <Image
          src={`/static/frame/cardFrame_L_${
            cardRarity.birthday ? 'bd' : cardRarity.level
          }.png`}
          className="rounded-lg"
          width={1024}
          height={576}
          sizes={cardSizes}
          alt="Card Frame"
        />
      </div>
    ),
    [afterTraining, className]
  )

  if (disableLink) {
    return cardNode
  } else {
    return (
      <Link href={`/card/${card.id}`} aria-label={card.prefix}>
        {cardNode}
      </Link>
    )
  }
}

export const Star: FunctionComponent<StarProps> = memo(props => {
  const { afterTraining, iconSizes, birthday } = props

  return (
    <Image
      src={`/static/rarity_star_${
        birthday ? 'birthday' : afterTraining ? 'afterTraining' : 'normal'
      }.png`}
      width={72}
      height={70}
      sizes={iconSizes}
      alt="Star"
    />
  )
})
