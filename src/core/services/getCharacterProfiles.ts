import { apiInstance } from './apiInstance'

import { CharacterProfile } from '../../@types/CharacterProfile'

export const getCharacterProfiles = apiInstance<CharacterProfile[]>(
  'characterProfiles.json'
)
