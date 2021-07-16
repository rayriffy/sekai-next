import moize from 'moize'

import { apiInstance } from './apiInstance'

import { MusicTag } from '../../@types/MusicTag'

export const getMusicTags = moize.promise(apiInstance<MusicTag[]>('musicTags.json'))
