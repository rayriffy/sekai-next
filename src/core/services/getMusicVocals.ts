import { apiInstance } from './apiInstance'

import { MusicVocal } from '../../@types/MusicVocal'

export const getMusicVocals = apiInstance<MusicVocal[]>(
  'https://raw.githubusercontent.com/Sekai-World/sekai-master-db-diff/master/musicVocals.json'
)
