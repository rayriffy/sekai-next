import axios from 'axios'

import { MusicTag } from '../../@types/MusicTag'

export const getMusicTags = async (): Promise<MusicTag[]> => {
  const res = await axios.get<MusicTag[]>(
    'https://raw.githubusercontent.com/Sekai-World/sekai-master-db-diff/master/musicTags.json'
  )

  return res.data
}
