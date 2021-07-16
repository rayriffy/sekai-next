import moize from 'moize'

import { apiInstance } from './apiInstance'

import { Tip } from '../../@types/Tip'

export const getTips = moize.promise(apiInstance<Tip[]>('tips.json'))
