import React from 'react'

import { DesktopNavbar } from '../navbar/desktop'
import { Offline } from '../offline'

export const DesktopHeader: React.FC = React.memo(props => {
  return (
    <div className="hidden lg:flex lg:flex-shrink-0">
      <div className="flex flex-col w-64 border-r border-gray-200 pt-5 pb-4 bg-blue-800 text-white">
        <div className="px-6">
          <p className="font-bold text-3xl">Sekai Viewer</p>
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
