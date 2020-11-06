import { apiInstance } from './apiInstance'

import { MusicDifficulty } from '../../@types/MusicDifficulty'

export const getMusicDifficulties = apiInstance<MusicDifficulty[]>(
  'https://raw.githubusercontent.com/Sekai-World/sekai-master-db-diff/master/musicDifficulties.json'
)
