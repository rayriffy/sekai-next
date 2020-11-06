import { Home } from '../../core/components/icons/home'
import { MusicNote } from '../../core/components/icons/musicNote'

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
    link: '/music',
    name: 'Music',
    match: ['/music', '/music/p/[page]'],
  },
]
