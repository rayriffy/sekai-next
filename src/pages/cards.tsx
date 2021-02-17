import { Fragment } from 'react'

import { GetStaticProps, NextPage } from 'next'

import { HeadTitle } from '../core/components/headTitle'
import { CardsListing } from '../modules/cards/components/listing'

import { Card } from '../@types/Card'

interface Props {
  cards: Pick<Card, 'id' | 'rarity' | 'attr' | 'assetbundleName' | 'prefix'>[]
}

const Page: NextPage<Props> = props => {
  return (
    <Fragment>
      <HeadTitle title="Cards" />
      <CardsListing {...props} />
    </Fragment>
  )
}

export const getStaticProps: GetStaticProps<Props> = async context => {
  const { pick, reverse } = await import('lodash')
  const { getCards } = await import('../core/services/getCards')

  const cards = await getCards()

  return {
    props: {
      // discard data that will not be rendered
      cards: reverse(cards.map(card =>
        pick(card, ['id', 'rarity', 'attr', 'assetbundleName', 'prefix'])
      )),
    },
  }
}

export default Page
