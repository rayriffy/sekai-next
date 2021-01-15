import { FunctionComponent, memo, useMemo } from 'react'

import Image from 'next/image'

import { CardEpisode } from '../../../@types/CardEpisode'
import { getTypeValue } from '../services/getTypeValue'
import { Card } from '../../../@types/Card'

interface Props {
  card: Card
  episodes: CardEpisode[]
  level: number
  unlockEpisode1?: boolean
  unlockEpisode2?: boolean
}

export const Power: FunctionComponent<Props> = memo(props => {
  const {
    episodes,
    unlockEpisode1 = false,
    unlockEpisode2 = false,
    level,
    card,
  } = props

  const targetCardParameters = useMemo(
    () =>
      card.cardParameters.filter(
        cardParameter => cardParameter.cardLevel === level
      ),
    [level]
  )
  const performanceValue = useMemo(
    () =>
      getTypeValue(
        '1',
        card,
        level,
        targetCardParameters,
        episodes,
        unlockEpisode1,
        unlockEpisode2
      ),
    [targetCardParameters, unlockEpisode1, unlockEpisode2]
  )
  const techniqueValue = useMemo(
    () =>
      getTypeValue(
        '2',
        card,
        level,
        targetCardParameters,
        episodes,
        unlockEpisode1,
        unlockEpisode2
      ),
    [targetCardParameters, unlockEpisode1, unlockEpisode2]
  )
  const staminaValue = useMemo(
    () =>
      getTypeValue(
        '3',
        card,
        level,
        targetCardParameters,
        episodes,
        unlockEpisode1,
        unlockEpisode2
      ),
    [targetCardParameters, unlockEpisode1, unlockEpisode2]
  )

  return (
    <div className="bg-white rounded-xl border-2 border-teal-200 p-6">
      <div className="flex items-center">
        <div>
          <div className="rounded-full text-white bg-teal-400 px-4 py-1">
            Power
          </div>
        </div>
        <div className="ml-4 flex items-center">
          <div className="w-6 h-6">
            <Image
              src="/static/icon_totalStrength.png"
              width={36}
              height={42}
            />
          </div>
          <span className="ml-2 text-xl text-gray-700 font-medium">
            {performanceValue + techniqueValue + staminaValue}
          </span>
        </div>
      </div>
      <div className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          <div className="flex items-center text-gray-700">
            <div className="w-5 h-5">
              <Image
                src="/static/icon_performance.png"
                width={28}
                height={28}
              />
            </div>
            <span className="text-sm pl-1 pr-2">Performance</span>
            <span className="text-md font-medium">{performanceValue}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <div className="w-5 h-5">
              <Image src="/static/icon_technique.png" width={28} height={28} />
            </div>
            <span className="text-sm pl-1 pr-2">Technique</span>
            <span className="text-md font-medium">{techniqueValue}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <div className="w-5 h-5">
              <Image
                className="w-3.5 h-3.5"
                src="/static/icon_stamina.png"
                width={28}
                height={28}
              />
            </div>
            <span className="text-sm pl-1 pr-2">Stamina</span>
            <span className="text-md font-medium">{staminaValue}</span>
          </div>
        </div>
      </div>
    </div>
  )
})
