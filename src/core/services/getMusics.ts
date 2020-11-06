import { apiInstance } from './apiInstance'

import { Music } from '../../@types/Music'

export const getMusics = apiInstance<Music[]>(
  'https://raw.githubusercontent.com/Sekai-World/sekai-master-db-diff/master/musics.json'
)
