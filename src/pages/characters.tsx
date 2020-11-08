import { Fragment, useEffect } from 'react'

import { GetStaticProps, NextPage } from 'next'

import { HeadTitle } from '../core/components/headTitle'

import { CharactersListing } from '../modules/characters/components/listing'

import { GameCharacter } from '../@types/GameCharacter'
import { UnitProfile } from '../@types/UnitProfile'

interface Props {
  unitProfiles: UnitProfile[]
  gameCharacters: GameCharacter[]
}

const Page: NextPage<Props> = props => {
  const { unitProfiles, gameCharacters } = props

  useEffect(() => {
    console.log('unitProfiles', unitProfiles)
    console.log('gameCharacters', gameCharacters)
  }, [unitProfiles, gameCharacters])

  return (
    <Fragment>
      <HeadTitle title="Characters" />
      {/* <p className="text-sm text-gray-900">{JSON.stringify(props)}</p> */}
      <CharactersListing {...props} />
    </Fragment>
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
