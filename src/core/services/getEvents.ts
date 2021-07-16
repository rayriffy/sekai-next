import moize from 'moize'

import { apiInstance } from './apiInstance'

import { Event } from '../../@types/Event'

export const getEvents = moize.promise(apiInstance<Event[]>('events.json'))
