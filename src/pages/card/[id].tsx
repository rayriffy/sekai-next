import React, { Fragment, useEffect, useMemo, useState } from 'react'

import { NextPage, GetStaticProps, GetStaticPaths } from 'next'
import Image from 'next/image'

import { HeadTitle } from '../../core/components/headTitle'
import { CharacterCard } from '../../core/components/characterCard'

import { Card } from '../../@types/Card'
import { getUnitBanner } from '../../modules/characters/services/getUnitBanner'
import { GameCharacter } from '../../@types/GameCharacter'
import { SwitchHorizontal } from '../../core/components/icons/switchHorizontal'

interface Props {
  card: Card
  character: GameCharacter
}

const Page: NextPage<Props> = props => {
  const { card, character } = props

  const [afterTrainingCard, setAfterTrainingCard] = useState(card.rarity >= 3)
  const [selectedLevel, setSelectedLevel] = useState(
    (card.rarity + 1) * 10 + (afterTrainingCard ? 10 : 0)
  )

  const targetCardParameters = useMemo(
    () =>
      card.cardParameters.filter(
        cardParameter => cardParameter.cardLevel === selectedLevel
      ),
    [selectedLevel]
  )

  useEffect(() => {
    console.log('card', card)
    console.log('character', character)
    console.log('targetCardParameters', targetCardParameters)
  }, [card, character, targetCardParameters])

  return (
    <Fragment>
      <HeadTitle title={card.prefix} />
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 lg:gap-8">
          <div className="col-span-6">
            <div className="flex pb-2 space-x-2">
              <div className="w-32 p-2">
                <Image src={getUnitBanner(character.unit)} unsized />
              </div>
              <div className="w-full text-gray-900 font-semibold">
                <h2 className="text-md border-b-4 border-teal-400 border-dotted">
                  {card.prefix}
                </h2>
                <h1 className="text-xl">
                  {character.firstName}
                  {character.givenName}
                </h1>
              </div>
            </div>
            <CharacterCard
              card={card}
              afterTraining={afterTrainingCard}
              disableLink
            />
            <div className="flex pt-4">
              <div className="relative">
                <button
                  onClick={() => setAfterTrainingCard(o => !o)}
                  disabled={card.rarity < 3}
                  className="bg-white rounded-full border-4 border-gray-300 p-1 text-teal-500 relative z-10 focus:outline-none focus:border-teal-300 focus:shadow-outline-indigo transition ease-in-out duration-150"
                >
                  <SwitchHorizontal className="w-6 h-6" />
                </button>
                <div className="absolute top-0 bottom-0 left-0 right-0 -mb-0.5 bg-black rounded-full transform scale-110"></div>
              </div>
            </div>
          </div>
          <div className="col-span-6 space-y-4 sm:space-y-6 lg:space-y-8">
            <div className="bg-white rounded-xl border-2 border-teal-200 p-6">
              <div className="flex items-center">
                <div>
                  <div className="rounded-full text-white bg-teal-400 px-4 py-1">
                    Power
                  </div>
                </div>
                <div className="ml-4 flex items-center">
                  <Image
                    className="w-5"
                    src="/static/icon_totalStrength.png"
                    unsized
                  />
                  <span className="ml-2 text-xl text-gray-700 font-medium">
                    32519
                  </span>
                </div>
              </div>
              <div className="pt-6">
                <div className="grid grid-cols-2 xl:grid-cols-3">
                  <div className="flex items-center text-gray-700">
                    <Image
                      className="w-4 h-4"
                      src="/static/icon_performance.png"
                      unsized
                    />
                    <span className="text-sm pl-1 pr-2">Performance</span>
                    <span className="text-md font-medium">9823</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Image
                      className="w-4 h-4"
                      src="/static/icon_technique.png"
                      unsized
                    />
                    <span className="text-sm pl-1 pr-2">Technique</span>
                    <span className="text-md font-medium">10689</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Image
                      className="w-4 h-4"
                      src="/static/icon_stamina.png"
                      unsized
                    />
                    <span className="text-sm pl-1 pr-2">Stamina</span>
                    <span className="text-md font-medium">12007</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl border-2 border-teal-200 p-6">
              <div className="flex items-center">
                <div>
                  <div className="rounded-full text-white bg-teal-400 px-4 py-1">
                    Level
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl border-2 border-teal-200 p-6">
              <div className="flex items-center">
                <div>
                  <div className="rounded-full text-white bg-teal-400 px-4 py-1">
                    Skill
                  </div>
                </div>
                <div className="ml-4 flex items-center">
                  <span className="text-xl text-gray-700 font-medium">
                    {card.cardSkillName}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export const getStaticProps: GetStaticProps<Props> = async context => {
  const { getCards } = await import('../../core/services/getCards')

  const { getGameCharacters } = await import(
    '../../core/services/getGameCharacters'
  )
  const { getUnitProfiles } = await import(
    '../../core/services/getUnitProfiles'
  )

  const targetId = Number(context.params.id)

  const cards = await getCards()
  const targetCard = cards.find(card => card.id === targetId)

  const [characters] = await Promise.all([getGameCharacters()])

  const targetCharacter = characters.find(
    character => character.id === targetCard.characterId
  )

  return {
    props: {
      card: targetCard,
      character: targetCharacter,
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
