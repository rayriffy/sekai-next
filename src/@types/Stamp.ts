export interface Stamp {
  id: number
  stampType: 'illustration' | 'text'
  seq: number
  name: string
  assetbundleName: string
  balloonAssetbundleName: string
  characterId1?: number
}
