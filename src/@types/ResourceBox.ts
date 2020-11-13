import { ResourceBoxDetail } from './ResourceBoxDetail'

export interface ResourceBox {
  resourceBoxPurpose: string
  id: number
  resourceBoxType: string
  details: ResourceBoxDetail[]
  description: string
  name: string
  assetbundleName: string
}
