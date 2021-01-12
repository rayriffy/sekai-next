import { getTips } from './getTips'

import { ComicTip } from '../../@types/Tip'

export const getComics = async () => {
  const tips = await getTips()

  return tips.filter(o => 'assetbundleName' in o) as ComicTip[]
}
