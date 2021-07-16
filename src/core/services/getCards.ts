import moize from 'moize'

import { apiInstance } from './apiInstance'

import { Card } from '../../@types/Card'

export const getCards = moize.promise(apiInstance<Card[]>('cards.json'))
