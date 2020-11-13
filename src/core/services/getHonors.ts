import { apiInstance } from './apiInstance'

import { Honor } from '../../@types/Honor'

export const getHonors = apiInstance<Honor[]>('honors.json')
