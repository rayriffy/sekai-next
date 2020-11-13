import { HonorLevel } from './HonorLevel'

export interface Honor {
  id: number
  seq: number
  groupId: number
  honorRarity: 'low' | 'middle' | 'high' | 'highest'
  name: string
  assetbundleName: string
  levels: HonorLevel[]
}
