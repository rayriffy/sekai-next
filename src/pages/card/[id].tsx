import { Fragment } from 'react'

import { NextPage, GetStaticProps, GetStaticPaths } from 'next'

import { HeadTitle } from '../../core/components/headTitle'
import { CardDetail } from '../../modules/card/components/detail'

import { Card } from '../../@types/Card'
import { GameCharacter } from '../../@types/GameCharacter'
import { CardEpisode } from '../../@types/CardEpisode'
import { Skill } from '../../@types/Skill'

interface Props {
  card: Card
  character: GameCharacter
  episodes: CardEpisode[]
  skill: Skill
}

const Page: NextPage<Props> = props => {
  const { card } = props

  return (
    <Fragment>
      <HeadTitle title={card.prefix} />
      <CardDetail {...props} />
    </Fragment>
  )
}

export const getStaticProps: GetStaticProps<Props> = async context => {
  const { default: _ } = await import('lodash')

  const { first } = _

  const { getCards } = await import('../../core/services/getCards')

  const { getGameCharacters } = await import(
    '../../core/services/getGameCharacters'
  )
  const { getUnitProfiles } = await import(
    '../../core/services/getUnitProfiles'
  )
  const { getCardEpisodes } = await import(
    '../../core/services/getCardEpisodes'
  )
  const { getSkills } = await import('../../core/services/getSkills')

  const targetId = Number(context.params.id)

  const cards = await getCards()
  const targetCard = cards.find(card => card.id === targetId)

  const [characters, cardEpisodes, skills] = await Promise.all([
    getGameCharacters(),
    getCardEpisodes(),
    getSkills(),
  ])

  const targetCharacter = characters.find(
    character => character.id === targetCard.characterId
  )
  const targetCardEpisodes = cardEpisodes.filter(
    cardEpisode => cardEpisode.cardId === targetId
  )
  const targetSkill = first(
    skills.filter(skill => skill.id === targetCard.skillId)
  )

  return {
    props: {
      card: targetCard,
      character: targetCharacter,
      episodes: targetCardEpisodes,
      skill: targetSkill,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { getCards } = await import('../../core/services/getCards')

  const cards = await getCards()

  return {
    paths: cards.map(card => ({
      params: {
        id: card.id.toString(),
      },
    })),
    fallback: false,
  }
}

export default Page
