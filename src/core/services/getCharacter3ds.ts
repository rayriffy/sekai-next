import moize from 'moize'

import { apiInstance } from './apiInstance'

import { Character3d } from '../../@types/Character3d'

export const getCharacter3ds = moize.promise(
  apiInstance<Character3d[]>('character3ds.json')
)
