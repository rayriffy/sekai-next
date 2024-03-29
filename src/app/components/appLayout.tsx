import {
  useState,
  useCallback,
  useEffect,
  Fragment,
  FunctionComponent,
  PropsWithChildren,
} from 'react'

import { useRouter } from 'next/router'

// import { ServiceWorker } from './serviceWorker'
import { MobileHeader } from './header/mobile'
import { MobileOverlay } from './mobileOverlay'
import { DesktopHeader } from './header/destop'

export const AppLayout: FunctionComponent<PropsWithChildren> = props => {
  const { children } = props

  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)

  useEffect(() => {
    setSidebarOpen(false)
  }, [router])

  const onToggleSidebar = useCallback(() => setSidebarOpen(o => !o), [])

  return (
    <Fragment>
      <div className="h-screen flex overflow-hidden bg-gradient-to-tr from-blue-100">
        <MobileOverlay show={sidebarOpen} onToggleSidebar={onToggleSidebar} />
        <DesktopHeader />
        <div className="flex flex-col w-0 flex-1 overflow-hidden">
          <MobileHeader onToggleSidebar={onToggleSidebar} />
          <main
            className="flex-1 relative z-0 overflow-y-auto focus:outline-none"
            tabIndex={0}
          >
            {children}
          </main>
        </div>
      </div>
      {/* <ServiceWorker /> */}
    </Fragment>
  )
}
