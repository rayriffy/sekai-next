import { apiInstance } from './apiInstance'

import { GameCharacter } from '../../@types/GameCharacter'

export const getGameCharacters = apiInstance<GameCharacter[]>(
  'https://raw.githubusercontent.com/Sekai-World/sekai-master-db-diff/master/gameCharacters.json'
)
