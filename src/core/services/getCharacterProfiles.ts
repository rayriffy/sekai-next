import moize from 'moize'

import { apiInstance } from './apiInstance'

import { CharacterProfile } from '../../@types/CharacterProfile'

export const getCharacterProfiles = moize.promise(apiInstance<CharacterProfile[]>(
  'characterProfiles.json'
))
