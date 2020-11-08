import { FunctionComponent } from 'react'

import Image from 'next/image'

import { getCard } from '../services/getCard'

import { Card } from '../../../@types/Card'

interface Props {
  cards: Card[]
}

export const CardsListing: FunctionComponent<Props> = props => {
  const { cards } = props
  return (
    <div className="p-6">
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {cards.map(card => (
          <div
            key={`card-listing-${card.id}`}
            className="rounded-lg overflow-hidden relative"
          >
            {/* <div className="absolute top-0 bottom-0 left-0 right-0 bg-black-overlay backdrop-blur z-10 transition ease-in-out duration-200 opacity-0 hover:opacity-100 text-white">
              Hello
            </div> */}
            <Image
              src={getCard(card.assetbundleName)}
              width={2048}
              height={1261}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
