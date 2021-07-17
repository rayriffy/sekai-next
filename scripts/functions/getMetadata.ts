import fs from 'fs-extra'
import path from 'path'
import { MetadataItem } from '../@types/MetadataItem'

const metadataFile = path.join(
  __dirname,
  '../../.next/cache/sekai-next-metadata/data.json'
)

export const getMetadata = (
  remoteUrl: string,
) => {
  if (!fs.existsSync(path.dirname(metadataFile))) {
    fs.mkdirSync(path.dirname(metadataFile))
  }

  if (!fs.existsSync(metadataFile)) {
    fs.writeJSONSync(metadataFile, [])
  }

  const metadata: MetadataItem[] = fs.readJSONSync(metadataFile)

  return metadata.find(o => o.key === remoteUrl)
}
