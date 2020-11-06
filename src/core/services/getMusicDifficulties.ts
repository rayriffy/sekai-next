import axios from 'axios'

import { MusicDifficulty } from '../../@types/MusicDifficulty'

export const getMusicDifficulties = async (): Promise<MusicDifficulty[]> => {
  const res = await axios.get<MusicDifficulty[]>(
    'https://raw.githubusercontent.com/Sekai-World/sekai-master-db-diff/master/musicDifficulties.json'
  )

  return res.data
}
