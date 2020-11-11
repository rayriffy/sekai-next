import { FunctionComponent, memo } from 'react'

import { useNetworkAvailability } from 'web-api-hooks'

import { useStoreon } from '../../../context/storeon'
import { MenuAlt1 } from '../../../core/components/icons/menuAlt1'

interface IProps {
  onToggleSidebar?(): void
}

export const MobileHeader: FunctionComponent<IProps> = memo(props => {
  const { onToggleSidebar = () => {} } = props

  return (
    <div className="relative z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200">
      <button
        onClick={onToggleSidebar}
        className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:bg-gray-100 focus:text-gray-600 lg:hidden"
        aria-label="Open sidebar"
      >
        <div className="inline-block relative">
          <MenuAlt1 className="h-6 w-6" />
          <Indicator />
        </div>
      </button>
      <Title />
    </div>
  )
})

const Title: FunctionComponent = memo(props => {
  const { title } = useStoreon('title')

  return (
    <div className="flex justify-center items-center px-4 sm:px-6 lg:px-8">
      <h2 className="text-gray-800 font-bold text-xl truncate">{title}</h2>
    </div>
  )
})

const Indicator: FunctionComponent = memo(props => {
  const isOnline = useNetworkAvailability()

  if (!isOnline) {
    return (
      <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full text-white shadow-solid bg-red-400"></span>
    )
  } else {
    return null
  }
})
