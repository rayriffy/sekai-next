import { Unit } from './Unit'

export interface GameCharacterUnit {
  id: number
  gameCharacterId: number
  unit: Unit
  colorCode: string
  skinColorCode: string
  skinShadowColorCode1: string
  skinShadowColorCode2: string
}
