import axios from 'axios'

import { MusicVocal } from '../../@types/MusicVocal'

export const getMusicVocals = async (): Promise<MusicVocal[]> => {
  const res = await axios.get<MusicVocal[]>(
    'https://raw.githubusercontent.com/Sekai-World/sekai-master-db-diff/master/musicVocals.json'
  )

  return res.data
}
