import { FunctionComponent, memo } from 'react'

import { DesktopNavbar } from '../navbar/desktop'
import { Offline } from '../offline'

export const DesktopHeader: FunctionComponent = memo(props => {
  return (
    <div className="hidden lg:flex lg:flex-shrink-0">
      <div className="flex flex-col w-64 border-r border-gray-200 pt-5 pb-4 text-white bg-gradient-to-r from-blue-500 to-teal-400">
        <div className="px-6">
          <p className="font-bold text-3xl">セカイ Wiki</p>
          <p className="text-xs text-gray-200">{process.env.buildNumber}</p>
        </div>
        <Offline />
        <div className="h-0 flex-1 flex flex-col overflow-y-auto">
          <DesktopNavbar />
        </div>
      </div>
    </div>
  )
})
