import { apiInstance } from './apiInstance'

import { Stamp } from '../../@types/Stamp'

export const getSkills = apiInstance<Stamp[]>('stamps.json')
