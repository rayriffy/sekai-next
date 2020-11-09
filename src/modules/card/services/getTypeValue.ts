import { CardParameter } from '../../../@types/CardParameter'
import { CardEpisode } from '../../../@types/CardEpisode'
import { Card } from '../../../@types/Card'

export const getTypeValue = (
  params: string,
  card: Card,
  level: number,
  cardParameters: CardParameter[],
  episodes: CardEpisode[],
  unlockEpisode1: boolean,
  unlockEpisode2: boolean
) => {
  const targetParameter = cardParameters.find(
    cardParameter => cardParameter.cardParameterType === `param${params}`
  )
  const minimumMaxLevel = (card.rarity + 1) * 10

  return (
    targetParameter.power +
    (level > minimumMaxLevel
      ? card[`specialTrainingPower${params}BonusFixed`]
      : 0) +
    (unlockEpisode1 ? episodes[0][`power${params}BonusFixed`] : 0) +
    (unlockEpisode2 ? episodes[1][`power${params}BonusFixed`] : 0)
  )
}
