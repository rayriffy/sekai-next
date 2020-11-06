import { apiInstance } from './apiInstance'

import { MusicVocal } from '../../@types/MusicVocal'

export const getMusicVocals = apiInstance<MusicVocal[]>('musicVocals.json')
