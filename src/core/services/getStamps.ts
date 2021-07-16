import moize from 'moize'

import { apiInstance } from './apiInstance'

import { Stamp } from '../../@types/Stamp'

export const getSkills = moize.promise(apiInstance<Stamp[]>('stamps.json'))
