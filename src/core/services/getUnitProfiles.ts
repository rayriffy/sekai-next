import { apiInstance } from './apiInstance'

import { UnitProfile } from '../../@types/UnitProfile'

export const getUnitProfiles = apiInstance<UnitProfile[]>('unitProfiles.json')
