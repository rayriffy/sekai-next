import { apiInstance } from './apiInstance'

import { CharacterProfile } from '../../@types/CharacterProfile'

export const getCharacterProfiles = apiInstance<CharacterProfile[]>(
  'https://raw.githubusercontent.com/Sekai-World/sekai-master-db-diff/master/characterProfiles.json'
)
