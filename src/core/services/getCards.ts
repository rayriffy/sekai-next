import { apiInstance } from './apiInstance'

import { Card } from '../../@types/Card'

export const getCards = apiInstance<Card[]>('cards.json')
