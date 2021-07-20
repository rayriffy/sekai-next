import { FunctionComponent, SVGProps } from 'react'

import {
  BookmarkAltIcon,
  CalendarIcon,
  CollectionIcon,
  FilmIcon,
  HomeIcon,
  InformationCircleIcon,
  MusicNoteIcon,
  UserIcon,
} from '@heroicons/react/outline'

export interface IMenu {
  icon: FunctionComponent<SVGProps<SVGSVGElement>>
  link: string
  name: string
  match: string[]
}

export const menus: IMenu[] = [
  {
    icon: HomeIcon,
    link: '/',
    name: 'Home',
    match: ['/'],
  },
  {
    icon: MusicNoteIcon,
    link: '/musics',
    name: 'Musics',
    match: ['/musics/[[...page]]', '/music/[id]'],
  },
  {
    icon: UserIcon,
    link: '/characters',
    name: 'Characters',
    match: ['/characters', '/character/[id]'],
  },
  {
    icon: CollectionIcon,
    link: '/cards',
    name: 'Cards',
    match: ['/cards', '/card/[id]'],
  },
  {
    icon: BookmarkAltIcon,
    link: '/comics',
    name: 'Comics',
    match: ['/comics'],
  },
  {
    icon: FilmIcon,
    link: '/virtualLives',
    name: 'Virtual Lives',
    match: ['/virtualLives', '/virtualLive/[id]'],
  },
  {
    icon: CalendarIcon,
    link: '/events',
    name: 'Events',
    match: ['/events', '/event/[id]'],
  },
  {
    icon: InformationCircleIcon,
    link: '/about',
    name: 'About',
    match: ['/about'],
  },
]
