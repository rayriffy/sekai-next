import { FunctionComponent, memo, useMemo, useState } from 'react'

import { CharacterCard } from '../../../core/components/characterCard'
import { SwitchHorizontalIcon } from '@heroicons/react/outline'
import { Power } from './power'
import { LevelSelector } from './level'
import { Header } from './header'
import { SideStory } from './sideStory'
import { SkillCard } from './skillCard'

import { Card } from '../../../@types/Card'
import { GameCharacter } from '../../../@types/GameCharacter'
import { CardEpisode } from '../../../@types/CardEpisode'
import { Skill } from '../../../@types/Skill'
import { getCardRarity } from '../../../core/services/getCardRarity'

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

export const CardDetail: FunctionComponent<Props> = memo(props => {
  const { card, character, episodes, skill } = props

  const cardRarity = useMemo(() => getCardRarity(card), [card.cardRarityType])

  const [afterTrainingCard, setAfterTrainingCard] = useState(
    cardRarity.level >= 3
  )
  const [selectedLevel, setSelectedLevel] = useState(
    (cardRarity.level + 1) * 10 + (afterTrainingCard ? 10 : 0)
  )

  const [unlockEpisode1, setUnlockEpisode1] = useState<boolean>(false)
  const [unlockEpisode2, setUnlockEpisode2] = useState<boolean>(false)

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 lg:gap-8">
        <div className="col-span-6">
          <Header card={card} character={character} />
          <CharacterCard
            card={card}
            cardRarity={cardRarity}
            afterTraining={afterTrainingCard}
            disableLink
          />
          <div className="block xl:flex justify-between pt-4">
            {!cardRarity.birthday && (
              <div className="flex pb-4 xl:pb-0">
                <div className="relative">
                  <button
                    onClick={() => setAfterTrainingCard(o => !o)}
                    disabled={cardRarity.level < 3}
                    className={`${
                      cardRarity.level < 3
                        ? 'bg-gray-200 cursor-not-allowed'
                        : 'bg-white'
                    } rounded-full border-4 border-gray-300 p-1 text-teal-500 relative z-10 focus:outline-none focus:border-teal-300 focus:shadow-outline-indigo transition ease-in-out duration-150`}
                  >
                    <SwitchHorizontalIcon className="w-6 h-6" />
                  </button>
                  <div className="absolute top-0 bottom-0 left-0 right-0 -mb-0.5 bg-black rounded-full transform scale-110"></div>
                </div>
              </div>
            )}
            {episodes.length !== 0 && (
              <SideStory
                episodes={episodes}
                episode1={{
                  locked: !unlockEpisode1,
                  onToggle: () => setUnlockEpisode1(o => !o),
                }}
                episode2={{
                  locked: !unlockEpisode2,
                  onToggle: () => setUnlockEpisode2(o => !o),
                }}
              />
            )}
          </div>
        </div>
        <div className="col-span-6 space-y-4 sm:space-y-6 lg:space-y-8">
          <Power
            level={selectedLevel}
            cardRarity={cardRarity.level}
            {...{
              card,
              episodes,
              unlockEpisode1,
              unlockEpisode2,
            }}
          />
          <LevelSelector
            onSelected={level => setSelectedLevel(level)}
            afterTraining={afterTrainingCard}
            cardRarity={cardRarity.level}
            level={selectedLevel}
          />
          <SkillCard card={card} skill={skill} />
        </div>
      </div>
    </div>
  )
})
