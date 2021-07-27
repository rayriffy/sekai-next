import moize from 'moize'

import { apiInstance } from './apiInstance'

import { MusicDifficulty } from '../../@types/MusicDifficulty'

export const getMusicDifficulties = moize.promise(
  apiInstance<MusicDifficulty[]>('musicDifficulties.json')
)
