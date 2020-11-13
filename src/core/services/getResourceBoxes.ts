import { apiInstance } from './apiInstance'

import { ResourceBox } from '../../@types/ResourceBox'

export const getResourceBoxes = apiInstance<ResourceBox[]>('resourceBoxes.json')
