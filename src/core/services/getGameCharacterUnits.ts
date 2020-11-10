import { apiInstance } from './apiInstance'

import { GameCharacterUnit } from '../../@types/GameCharacterUnit'

export const getGameCharacterUnits = apiInstance<GameCharacterUnit[]>(
  'gameCharacterUnits.json'
)
