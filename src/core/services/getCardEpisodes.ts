import { apiInstance } from './apiInstance'

import { CardEpisode } from '../../@types/CardEpisode'

export const getCardEpisodes = apiInstance<CardEpisode[]>('cardEpisodes.json')
