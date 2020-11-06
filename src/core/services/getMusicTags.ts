import { apiInstance } from './apiInstance'

import { MusicTag } from '../../@types/MusicTag'

export const getMusicTags = apiInstance<MusicTag[]>(
  'https://raw.githubusercontent.com/Sekai-World/sekai-master-db-diff/master/musicTags.json'
)
