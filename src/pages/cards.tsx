import { GetStaticProps, NextPage } from 'next'

import { Card } from '../@types/Card'

interface Props {
  cards: Card[]
}

export const Cards: NextPage<Props> = props => {
  const { cards } = props

  return <div className="p-8">{JSON.stringify(cards)}</div>
}

export const getStaticProps: GetStaticProps<Props> = async context => {
  const { getCards } = await import('../core/services/getCards')

  const cards = await getCards()

  return {
    props: {
      cards,
    },
  }
}
