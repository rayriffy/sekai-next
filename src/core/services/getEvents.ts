import { apiInstance } from './apiInstance'

import { Event } from '../../@types/Event'

export const getEvents = apiInstance<Event[]>('events.json')
