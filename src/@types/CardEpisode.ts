export interface CardEpisode {
  id: number
  seq: number
  cardId: number
  title: string
  scenarioId: string
  assetbundleName: string
  releaseConditionId: number
  power1BonusFixed: number
  power2BonusFixed: number
  power3BonusFixed: number
  rewardResourceBoxIds: number[]
  costs: {
    resourceId: number
    resourceType: string
    quantity: number
  }[]
  cardEpisodePartType: string
}
