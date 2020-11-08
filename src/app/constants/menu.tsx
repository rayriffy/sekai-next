import { Collection } from '../../core/components/icons/collection'
import { Home } from '../../core/components/icons/home'
import { MusicNote } from '../../core/components/icons/musicNote'
import { User } from '../../core/components/icons/user'

export interface IMenu {
  icon: React.FC<React.SVGProps<SVGSVGElement>>
  link: string
  name: string
  match: string[]
}

export const menus: IMenu[] = [
  {
    icon: Home,
    link: '/',
    name: 'Home',
    match: ['/'],
  },
  {
    icon: MusicNote,
    link: '/musics',
    name: 'Musics',
    match: ['/musics/[[...page]]', '/music/[id]'],
  },
  {
    icon: User,
    link: '/characters',
    name: 'Characters',
    match: ['/characters', '/character/[id]'],
  },
  {
    icon: Collection,
    link: '/cards',
    name: 'Cards',
    match: ['/cards', '/card/[id]'],
  },
]
