import { useMemo, FunctionComponent, memo } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'

import { IMenu, menus } from '../../constants/menu'

const DesktopMenuLink: FunctionComponent<IMenu> = memo(props => {
  const router = useRouter()
  const isMatch = useMemo(() => props.match.includes(router.pathname), [router])

  return (
    <Link
      href={props.link}
      className={`group flex items-center px-2 py-2 text-sm leading-5 font-medium rounded-md focus:outline-none bg-gradient-to-r focus:from-blue-600 focus:to-teal-500 transition ease-in-out duration-150 ${
        isMatch
          ? 'text-white from-blue-700 to-teal-600'
          : 'text-blue-300 hover:text-white hover:from-blue-600 hover:to-teal-500'
      }`}
    >
      <props.icon
        className={`mr-3 h-6 w-6 group-hover:text-blue-200 group-focus:text-blue-200 transition ease-in-out duration-150 ${
          isMatch ? 'text-blue-400' : 'text-blue-300'
        }`}
      />
      {props.name}
    </Link>
  )
})

export const DesktopNavbar: FunctionComponent = memo(props => {
  return (
    <nav className="px-3 mt-6">
      <div className="space-y-1">
        {menus.map(menu => (
          <DesktopMenuLink key={`navbar-desktop-link-${menu.name}`} {...menu} />
        ))}
      </div>
      <div className="mt-8">
        <h3
          className="px-3 text-xs leading-4 font-semibold text-white uppercase tracking-wider"
          id="teams-headline"
        >
          Tools
        </h3>
        <div
          className="mt-1 space-y-1"
          role="group"
          aria-labelledby="teams-headline"
        >
          {/* {tags.map(tag => (
            <a
              href="#"
              key={`navbar-desktop-tag-${tag.prefix}`}
              className="group flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-700 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition ease-in-out duration-150"
            >
              <span
                className={`w-2.5 h-2.5 mr-4 rounded-full ${tag.color}`}
              ></span>
              <span className="truncate">{capitalize(tag.name)}</span>
            </a>
          ))} */}
        </div>
      </div>
    </nav>
  )
})
