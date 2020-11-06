import { apiInstance } from './apiInstance'

import { GameCharacter } from '../../@types/GameCharacter'

export const getGameCharacters = apiInstance<GameCharacter[]>(
  'gameCharacters.json'
)
