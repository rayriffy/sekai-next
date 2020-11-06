import { chunk } from 'lodash'

import { getMusics } from './getMusics'
import { itemsPerPage } from '../../../core/constants/itemsPerPage'

import { Music } from '../../../@types/Music'

export const getMusicsChunks = async (): Promise<Music[][]> => {
  const musics = await getMusics()

  return chunk(musics, itemsPerPage)
}
