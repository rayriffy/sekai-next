import moize from 'moize'

import { apiInstance } from './apiInstance'

import { GameCharacter } from '../../@types/GameCharacter'

export const getGameCharacters = moize.promise(
  apiInstance<GameCharacter[]>('gameCharacters.json')
)
