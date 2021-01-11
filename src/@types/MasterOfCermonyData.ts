import { CharacterSpawnEvent } from './CharacterSpawnEvent'
import { CharacterTalkEvent } from './CharacterTalkEvent'
import { CharacterUnspawnEvent } from './CharacterUnspawnEvent'

export interface MasterOfCermonyData {
  Id: string
  characterSpawnEvents: CharacterSpawnEvent[]
  characterUnspawnEvents: CharacterUnspawnEvent[]
  // characterMoveEvents: CharacterMoveEvent[];
  // characterRotateEvents: CharacterRotateEvent[];
  // characterMotionEvents: CharacterMotionEvent[];
  characterTalkEvents: CharacterTalkEvent[]
  // characterIntaractionEvents: any[];
  // effectMCEvents: any[];
  // lightEvents: LightEvent[];
  soundEvents: unknown[]
  // bgmEvents: any[];
  // audienceEvents: AudienceEvent[];
  // stageObjectSpawnEvents: any[];
  // globalSpotlightEvents: GlobalSpotlightEvent[];
  // aisacEvents: AisacEvent[];
  // screenFadeEvents: any[];
}
