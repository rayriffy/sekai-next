interface TipBase {
  id: number
  title: string
  fromUserRank: number
  toUserRank: number
}

export interface TextTip extends TipBase {
  description: string
}

export interface ComicTip extends TipBase {
  assetbundleName: string
}

export type Tip = TextTip | ComicTip
