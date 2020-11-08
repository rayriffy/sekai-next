import { StoreonModule } from 'storeon'

export interface TitleStore {
  title: string
}

export interface TitleEvent {
  'title/set': string
}

export const title: StoreonModule<TitleStore, TitleEvent> = store => {
  store.on('@init', () => ({ title: '' }))

  store.on('title/set', (_, event) => ({ title: event }))
}
