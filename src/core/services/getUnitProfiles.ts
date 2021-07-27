import moize from 'moize'

import { apiInstance } from './apiInstance'

import { UnitProfile } from '../../@types/UnitProfile'

export const getUnitProfiles = moize.promise(
  apiInstance<UnitProfile[]>('unitProfiles.json')
)
