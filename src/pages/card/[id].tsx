import { Fragment } from 'react'

import { NextPage, GetStaticProps, GetStaticPaths } from 'next'

import { HeadTitle } from '../../core/components/headTitle'
import { CardDetail } from '../../modules/card/components/detail'

import { Card } from '../../@types/Card'
import { GameCharacter } from '../../@types/GameCharacter'
import { CardEpisode } from '../../@types/CardEpisode'
import { Skill } from '../../@types/Skill'

interface Props {
  card: Pick<
    Card,
    | 'id'
    | 'cardRarityType'
    | 'attr'
    | 'assetbundleName'
    | 'prefix'
    | 'cardParameters'
    | 'cardSkillName'
    | 'specialTrainingPower1BonusFixed'
    | 'specialTrainingPower2BonusFixed'
    | 'specialTrainingPower3BonusFixed'
  >
  character: Pick<GameCharacter, 'firstName' | 'givenName' | 'unit'>
  episodes: Pick<
    CardEpisode,
    'title' | 'power1BonusFixed' | 'power2BonusFixed' | 'power3BonusFixed'
  >[]
  skill: Pick<Skill, 'description' | 'skillEffects'>
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

  const { first, pick } = _

  const { getCards } = await import('../../core/services/getCards')

  const { getGameCharacters } = await import(
    '../../core/services/getGameCharacters'
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
      card: pick(targetCard, [
        'id',
        'cardRarityType',
        'attr',
        'assetbundleName',
        'prefix',
        'cardParameters',
        'cardSkillName',
        'specialTrainingPower1BonusFixed',
        'specialTrainingPower2BonusFixed',
        'specialTrainingPower3BonusFixed',
      ]),
      character: pick(targetCharacter, ['firstName', 'givenName', 'unit']),
      episodes: targetCardEpisodes.map(o =>
        pick(o, [
          'title',
          'power1BonusFixed',
          'power2BonusFixed',
          'power3BonusFixed',
        ])
      ),
      skill: pick(targetSkill, ['description', 'skillEffects']),
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
