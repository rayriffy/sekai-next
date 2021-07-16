import moize from 'moize'

import { apiInstance } from './apiInstance'

import { Music } from '../../@types/Music'

export const getMusics = moize.promise(apiInstance<Music[]>('musics.json'))
