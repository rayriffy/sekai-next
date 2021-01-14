import { Fragment, useMemo } from 'react'

import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import { HeadTitle } from '../../core/components/headTitle'
import { CharacterDetail } from '../../modules/character/components/detail'

import { GameCharacter } from '../../@types/GameCharacter'
import { CharacterProfile } from '../../@types/CharacterProfile'
import { Music } from '../../@types/Music'
import { Card } from '../../@types/Card'
import { GameCharacterUnit } from '../../@types/GameCharacterUnit'

interface Props {
  character: GameCharacter
  profile: CharacterProfile
  musics: Music[]
  cards: Card[]
  characterUnit: GameCharacterUnit
}

const Page: NextPage<Props> = props => {
  const {
    character: { firstName, givenName, firstNameRuby, givenNameRuby },
  } = props

  const characterName = useMemo(
    () =>
      firstName === undefined
        ? `${givenName} (${givenNameRuby})`
        : `${firstName} ${givenName} (${firstNameRuby} ${givenNameRuby})`,
    []
  )

  return (
    <Fragment>
      <HeadTitle title={characterName} />
      <CharacterDetail {...props} />
    </Fragment>
  )
}

export const getStaticProps: GetStaticProps<Props> = async context => {
  const { getGameCharacters } = await import(
    '../../core/services/getGameCharacters'
  )

  const { getCharacterProfiles } = await import(
    '../../core/services/getCharacterProfiles'
  )
  const { getMusics } = await import('../../core/services/getMusics')
  const { getMusicVocals } = await import('../../core/services/getMusicVocals')
  const { getCards } = await import('../../core/services/getCards')
  const { getGameCharacterUnits } = await import(
    '../../core/services/getGameCharacterUnits'
  )

  const targetId = Number(context.params.id)

  const characters = await getGameCharacters()
  const targetCharacter = characters.find(
    character => character.id === targetId
  )

  // mass data grinding
  const [
    characterProfiles,
    musics,
    musicVocals,
    cards,
    gameCharacterUnits,
  ] = await Promise.all([
    getCharacterProfiles(),
    getMusics(),
    getMusicVocals(),
    getCards(),
    getGameCharacterUnits(),
  ])

  // get character profile
  const targetCharacterProfile = characterProfiles.find(
    profile => profile.characterId === targetId
  )

  // get all music that character sing
  const targetMusicVocals = musicVocals.filter(musicVocal =>
    musicVocal.characters
      .map(character => character.characterId)
      .includes(targetId)
  )
  const targetMusics = musics.filter(music =>
    targetMusicVocals
      .map(targetMusicVocal => targetMusicVocal.musicId)
      .includes(music.id)
  )

  // get character card
  const targetCards = cards.filter(card => card.characterId === targetId)

  // get character unit
  const targetCharacterUnit = gameCharacterUnits.find(
    gameCharacterUnit => gameCharacterUnit.gameCharacterId === targetId
  )

  return {
    props: {
      character: targetCharacter,
      profile: targetCharacterProfile,
      musics: targetMusics,
      characterUnit: targetCharacterUnit,
      cards: targetCards.map(card => ({
        ...card,
        cardParameters: [],
        specialTrainingCosts: [],
      })),
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { getGameCharacters } = await import(
    '../../core/services/getGameCharacters'
  )

  const characters = await getGameCharacters()

  return {
    paths: characters.map(character => ({
      params: {
        id: character.id.toString(),
      },
    })),
    fallback: false,
  }
}

export default Page
