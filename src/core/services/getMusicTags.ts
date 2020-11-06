import { apiInstance } from './apiInstance'

import { MusicTag } from '../../@types/MusicTag'

export const getMusicTags = apiInstance<MusicTag[]>('musicTags.json')
