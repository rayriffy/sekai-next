import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import { GameCharacter } from '../../@types/GameCharacter'
import { CharacterProfile } from '../../@types/CharacterProfile'
import { Music } from '../../@types/Music'

interface Props {
  character: GameCharacter
  profile: CharacterProfile
  music: Music
}

const Page: NextPage<Props> = props => {
  return (
    <div className="p-8 text-sm text-gray-900">{JSON.stringify(props)}</div>
  )
}

export const getStaticProps: GetStaticProps = async context => {
  const { getGameCharacters } = await import(
    '../../core/services/getGameCharacters'
  )

  const { getCharacterProfiles } = await import(
    '../../core/services/getCharacterProfiles'
  )
  const { getMusics } = await import('../../core/services/getMusics')
  const { getMusicVocals } = await import('../../core/services/getMusicVocals')

  const targetId = Number(context.params.id)

  const characters = await getGameCharacters()
  const targetCharacter = characters.find(
    character => character.id === targetId
  )

  // mass data grinding
  const [characterProfiles, musics, musicVocals] = await Promise.all([
    getCharacterProfiles(),
    getMusics(),
    getMusicVocals(),
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
  const targetMusic = musics.filter(music =>
    targetMusicVocals
      .map(targetMusicVocal => targetMusicVocal.musicId)
      .includes(music.id)
  )

  return {
    props: {
      character: targetCharacter,
      profile: targetCharacterProfile,
      music: targetMusic,
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
