import { Unit } from './Unit'

export interface Character3d {
  id: number
  characterType: 'game_character'
  characterId: number
  unit: Unit
  name: string
  headCostume3dId: number
  bodyCostume3dId: number
}
