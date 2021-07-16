import moize from 'moize'

import { apiInstance } from './apiInstance'

import { ResourceBox } from '../../@types/ResourceBox'

export const getResourceBoxes = moize.promise(apiInstance<ResourceBox[]>('resourceBoxes.json'))
