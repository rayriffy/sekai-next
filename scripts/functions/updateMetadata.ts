import fs from 'fs-extra'
import path from 'path'
import { MetadataItem } from '../@types/MetadataItem'

const metadataFile = path.join(
  __dirname,
  '../../.next/cache/sekai-next-metadata/data.json'
)

export const updateMetadata = (
  remoteUrl: string,
  data: MetadataItem['data']
) => {
  if (!fs.existsSync(path.dirname(metadataFile))) {
    fs.mkdirSync(path.dirname(metadataFile))
  }

  if (!fs.existsSync(metadataFile)) {
    fs.writeJSONSync(metadataFile, [])
  }

  const metadata: MetadataItem[] = fs.readJSONSync(metadataFile)

  const targetItem = metadata.find(o => o.key === remoteUrl)

  if (targetItem === undefined) {
    fs.writeJSONSync(metadataFile, [...metadata, { key: remoteUrl, data }])
  } else {
    targetItem.data = data
    fs.writeJSONSync(
      metadataFile,
      metadata.map(item => {
        if (item.key === remoteUrl) {
          return {
            key: remoteUrl,
            data,
          }
        } else {
          return item
        }
      })
    )
  }
}
