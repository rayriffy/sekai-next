import { BreastSize } from './BreastSize'
import { Figure } from './Figure'
import { Gender } from './Gender'
import { Unit } from './Unit'

export interface GameCharacter {
  id: number
  seq: number
  resourceId: number
  firstName: string
  givenName: string
  firstNameRuby: string
  givenNameRuby: string
  gender: Gender
  height: number
  live2dHeightAdjustment: number
  figure: Figure
  breastSize: BreastSize
  modelName: string
  unit: Unit
  supportUnitType: string
}
