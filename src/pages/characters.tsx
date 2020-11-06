import { GetStaticProps, NextPage } from 'next'

import { GameCharacter } from '../@types/GameCharacter'
import { UnitProfile } from '../@types/UnitProfile'

interface Props {
  unitProfiles: UnitProfile[]
  gameCharacters: GameCharacter[]
}

const Page: NextPage<Props> = props => {
  return (
    <div>
      <p className="text-sm text-gray-900">{JSON.stringify(props)}</p>
    </div>
  )
}

export const getStaticProps: GetStaticProps<Props> = async context => {
  const { getUnitProfiles } = await import('../core/services/getUnitProfiles')
  const { getGameCharacters } = await import(
    '../core/services/getGameCharacters'
  )

  const [unitProfiles, gameCharacters] = await Promise.all([
    getUnitProfiles(),
    getGameCharacters(),
  ])

  return {
    props: {
      unitProfiles,
      gameCharacters,
    },
  }
}

export default Page
