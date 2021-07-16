import moize from 'moize'

import { apiInstance } from './apiInstance'

import { Honor } from '../../@types/Honor'

export const getHonors = moize.promise(apiInstance<Honor[]>('honors.json'))
