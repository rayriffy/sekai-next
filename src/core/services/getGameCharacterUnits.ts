import moize from 'moize'

import { apiInstance } from './apiInstance'

import { GameCharacterUnit } from '../../@types/GameCharacterUnit'

export const getGameCharacterUnits = moize.promise(apiInstance<GameCharacterUnit[]>(
  'gameCharacterUnits.json'
))
