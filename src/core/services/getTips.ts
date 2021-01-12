import { apiInstance } from './apiInstance'

import { Tip } from '../../@types/Tip'

export const getTips = apiInstance<Tip[]>('tips.json')
