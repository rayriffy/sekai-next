import { GetStaticProps, NextPage } from 'next'
import { useEffect } from 'react'

import { Card } from '../@types/Card'

interface Props {
  cards: Card[]
}

const Page: NextPage<Props> = props => {
  const { cards } = props

  useEffect(() => {
    console.log(cards)
  }, [cards])

  return <div className="p-8">{JSON.stringify(cards)}</div>
}

export const getStaticProps: GetStaticProps<Props> = async context => {
  const { getCards } = await import('../core/services/getCards')

  const cards = await getCards()

  return {
    props: {
      // discard data that will not be rendered
      cards: cards.map(card => ({
        ...card,
        cardParameters: [],
      })),
    },
  }
}

export default Page
