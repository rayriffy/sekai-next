import axios from 'axios'

import { Music } from '../../@types/Music'

export const getMusics = async (): Promise<Music[]> => {
  const res = await axios.get<Music[]>(
    'https://raw.githubusercontent.com/Sekai-World/sekai-master-db-diff/master/musics.json'
  )

  return res.data
}
