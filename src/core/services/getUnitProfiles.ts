import { apiInstance } from './apiInstance'

import { UnitProfile } from '../../@types/UnitProfile'

export const getUnitProfiles = apiInstance<UnitProfile[]>(
  'https://raw.githubusercontent.com/Sekai-World/sekai-master-db-diff/master/unitProfiles.json'
)
