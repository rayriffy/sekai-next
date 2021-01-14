export interface Event {
  id: number
  eventType: string
  name: string
  assetbundleName: string
  bgmAssetbundleName: string
  startAt: number
  aggregateAt: number
  rankingAnnounceAt: number
  distributionStartAt: number
  closedAt: number
  distributionEndAt: number
  virtualLiveId?: number
  eventRankingRewardRanges: {
    id: number
    eventId: number
    fromRank: number
    toRank: number
    eventRankingRewards: {
      id: number
      eventRankingRewardRangeId: number
      resourceBoxId: number
    }[]
  }[]
}
