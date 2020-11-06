import { apiInstance } from './apiInstance'

import { Music } from '../../@types/Music'

export const getMusics = apiInstance<Music[]>('musics.json')
