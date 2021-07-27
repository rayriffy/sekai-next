import moize from 'moize'
import { apiInstance } from './apiInstance'

import { Skill } from '../../@types/Skill'

export const getSkills = moize.promise(apiInstance<Skill[]>('skills.json'))
