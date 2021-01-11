import { MasterOfCermonyBaseEvent } from './MasterOfCermonyBaseEvent'

export interface CharacterTalkEvent extends MasterOfCermonyBaseEvent {
  Serif: string
  VoiceKey: string
}
