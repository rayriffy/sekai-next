import { MasterOfCermonyBaseEvent } from './MasterOfCermonyBaseEvent'

export interface CharacterSpawnEvent extends MasterOfCermonyBaseEvent {
  HeadCostume3dId: number
  BodyCostume3dId: number
}
