import { FunctionComponent } from 'react'

import { createContext } from 'react'

import { createStoreon } from 'storeon'
import { customContext } from 'storeon/react'

import { title } from './store/title'

export const store = createStoreon([title])

const StoreonContext = createContext(store)

export const useStoreon = customContext(StoreonContext)

export const Context: FunctionComponent = props => {
  const { children } = props

  return (
    <StoreonContext.Provider value={store}>{children}</StoreonContext.Provider>
  )
}
