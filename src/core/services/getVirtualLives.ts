import moize from 'moize'

import { apiInstance } from './apiInstance'

import { VirtualLive } from '../../@types/VirtualLive'

export const getVirtualLives = moize.promise(
  apiInstance<VirtualLive[]>('virtualLives.json')
)
