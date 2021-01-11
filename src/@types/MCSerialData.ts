import { CharacterSpawnEvent } from './CharacterSpawnEvent'
import { CharacterTalkEvent } from './CharacterTalkEvent'
import { CharacterUnspawnEvent } from './CharacterUnspawnEvent'

export type MCSerialData =
  | {
      type: 'spawn'
      data: CharacterSpawnEvent
    }
  | {
      type: 'unspawn'
      data: CharacterUnspawnEvent
    }
  | {
      type: 'talk'
      data: CharacterTalkEvent
    }
