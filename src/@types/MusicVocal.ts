export interface MusicVocal {
  id: number
  musicId: number
  musicVocalType: string
  seq: number
  releaseConditionId: number
  caption: string
  characters: {
    id: number
    musicId: number
    musicVocalId: number
    characterType: string
    characterId: number
    seq: number
  }[]
  assetbundleName: string
}
