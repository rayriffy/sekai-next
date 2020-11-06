import { apiInstance } from './apiInstance'

import { MusicDifficulty } from '../../@types/MusicDifficulty'

export const getMusicDifficulties = apiInstance<MusicDifficulty[]>(
  'musicDifficulties.json'
)
