import { VirtualItem } from './VirtualItem'
import { VirtualLiveBeginnerSchedule } from './VirtualLiveBeginnerSchedule'
import { VirtualLiveCharacter } from './VirtualLiveCharacter'
import { VirtualLiveReward } from './VirtualLiveReward'
import { VirtualLiveSchedule } from './VirtualLiveSchedule'
import { VirtualLiveSetlist } from './VirtualLiveSetlist'
import { VirtualLiveWaitingRoom } from './VirtualLiveWaitingRoom'

export interface VirtualLive {
  id: number
  virtualLiveType: 'normal' | 'beginner'
  virtualLivePlatform: string
  seq: number
  name: string
  assetbundleName: string
  screenMvMusicVocalId: number
  startAt: number
  endAt: number
  rankingAnnounceAt: number
  virtualLiveSetlists: VirtualLiveSetlist[]
  virtualLiveBeginnerSchedules: VirtualLiveBeginnerSchedule[]
  virtualLiveSchedules: VirtualLiveSchedule[]
  virtualLiveCharacters: VirtualLiveCharacter[]
  virtualLiveReward: VirtualLiveReward
  virtualLiveRewards: VirtualLiveReward[]
  virtualLiveCheerPointRewards: unknown[]
  virtualLiveWaitingRoom: VirtualLiveWaitingRoom
  virtualItems: VirtualItem[]
  archiveReleaseConditionId?: number
}
