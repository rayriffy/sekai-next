import { apiInstance } from './apiInstance'

import { Skill } from '../../@types/Skill'

export const getSkills = apiInstance<Skill[]>('skills.json')
