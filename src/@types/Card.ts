export interface Card {
  id: number
  seq: number
  characterId: number
  rarity: number
  specialTrainingPower1BonusFixed: number
  specialTrainingPower2BonusFixed: number
  specialTrainingPower3BonusFixed: number
  attr: string
  supportUnit: string
  skillId: number
  cardSkillName: string
  prefix: string
  assetbundleName: string
  gachaPhrase: string
  flavorText: string
  releaseAt: number
  cardParameters: {
    id: number
    cardId: number
    cardLevel: number
    cardParameterType: string
    power: number
  }[]
  specialTrainingCosts: unknown[]
  masterLessonAchieveResources: {
    releaseConditionId: number
    cardId: number
    masterRank: number
    resources: unknown[]
  }[]
}
