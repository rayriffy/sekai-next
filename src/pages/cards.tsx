import { Fragment, useEffect } from 'react'

import { GetStaticProps, NextPage } from 'next'

import { HeadTitle } from '../core/components/headTitle'
import { CardsListing } from '../modules/cards/components/listing'

import { Card } from '../@types/Card'

interface Props {
  cards: Card[]
}

const Page: NextPage<Props> = props => {
  const { cards } = props

  return (
    <Fragment>
      <HeadTitle title="Cards" />
      <CardsListing {...props} />
    </Fragment>
  )
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
        specialTrainingCosts: [],
      })),
    },
  }
}

export default Page
