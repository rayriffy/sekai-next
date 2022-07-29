import { Attr } from './Attr'
import { CardParameter } from './CardParameter'

export interface Card {
  id: number
  seq: number
  characterId: number
  cardRarityType:
    | 'rarity_1'
    | 'rarity_2'
    | 'rarity_3'
    | 'rarity_4'
    | 'rarity_birthday'
  specialTrainingPower1BonusFixed: number
  specialTrainingPower2BonusFixed: number
  specialTrainingPower3BonusFixed: number
  attr: Attr
  supportUnit: string
  skillId: number
  cardSkillName: string
  prefix: string
  assetbundleName: string
  gachaPhrase: string
  flavorText: string
  releaseAt: number
  cardParameters: CardParameter[]
  specialTrainingCosts: {
    cardId: number
    cost: {
      quantity: number
      resourceId: number
      resourceLevel: number
      resourceType: string
    }
  }[]
  masterLessonAchieveResources: {
    releaseConditionId: number
    cardId: number
    masterRank: number
    resources: unknown[]
  }[]
}
