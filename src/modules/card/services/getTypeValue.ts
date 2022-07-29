import { CardParameter } from '../../../@types/CardParameter'
import { CardEpisode } from '../../../@types/CardEpisode'
import { Card } from '../../../@types/Card'

export const getTypeValue = (
  params: string,
  card: Pick<
    Card,
    | 'specialTrainingPower1BonusFixed'
    | 'specialTrainingPower2BonusFixed'
    | 'specialTrainingPower3BonusFixed'
  >,
  cardRarity: number,
  level: number,
  cardParameters: Pick<CardParameter, 'cardParameterType' | 'power'>[],
  episodes: Pick<
    CardEpisode,
    'power1BonusFixed' | 'power2BonusFixed' | 'power3BonusFixed'
  >[],
  unlockEpisode1: boolean,
  unlockEpisode2: boolean
) => {
  const targetParameter = cardParameters.find(
    cardParameter => cardParameter.cardParameterType === `param${params}`
  )
  const minimumMaxLevel = (cardRarity + 1) * 10

  return (
    targetParameter.power +
    (level > minimumMaxLevel
      ? card[`specialTrainingPower${params}BonusFixed`]
      : 0) +
    (unlockEpisode1 ? episodes[0][`power${params}BonusFixed`] : 0) +
    (unlockEpisode2 ? episodes[1][`power${params}BonusFixed`] : 0)
  )
}
