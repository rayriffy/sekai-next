import moize from 'moize'

import { apiInstance } from './apiInstance'

import { CardEpisode } from '../../@types/CardEpisode'

export const getCardEpisodes = moize.promise(
  apiInstance<CardEpisode[]>('cardEpisodes.json')
)
