import moize from 'moize'

import { apiInstance } from './apiInstance'

import { MusicVocal } from '../../@types/MusicVocal'

export const getMusicVocals = moize.promise(
  apiInstance<MusicVocal[]>('musicVocals.json')
)
