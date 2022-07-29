import { FunctionComponent } from 'react'

import { CharacterCard } from '../../../core/components/characterCard'

import { Card } from '../../../@types/Card'
import { getCardRarity } from '../../../core/services/getCardRarity'

interface Props {
  cards: Pick<
    Card,
    'id' | 'cardRarityType' | 'attr' | 'assetbundleName' | 'prefix'
  >[]
}

export const CardsListing: FunctionComponent<Props> = props => {
  const { cards } = props

  return (
    <div className="p-6">
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {cards.map(card => (
          <CharacterCard
            key={`card-listing-${card.id}`}
            card={card}
            cardRarity={getCardRarity(card)}
            afterTraining={getCardRarity(card).level >= 3}
          />
        ))}
      </div>
    </div>
  )
}
