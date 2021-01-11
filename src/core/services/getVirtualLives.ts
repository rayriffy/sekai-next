import { apiInstance } from './apiInstance'

import { VirtualLive } from '../../@types/VirtualLive'

export const getVirtualLives = apiInstance<VirtualLive[]>('virtualLives.json')
