import axios from 'axios'
import { sortBy } from 'lodash'

import { MasterOfCermonyData } from '../../@types/MasterOfCermonyData'
import { MCSerialData } from '../../@types/MCSerialData'

export const getMCScenario = async (
  virtualLiveSetlistAssetBundleName: string
) => {
  const res = await axios.get<MasterOfCermonyData>(
    `https://minio.dnaroma.eu/sekai-assets/virtual_live/mc/scenario/${virtualLiveSetlistAssetBundleName}_rip/${virtualLiveSetlistAssetBundleName}.asset`
  )

  const payload: MCSerialData[] = [
    ...res.data.characterSpawnEvents.map(event => ({
      type: 'spawn' as 'spawn',
      data: event,
    })),
    ...res.data.characterUnspawnEvents.map(event => ({
      type: 'unspawn' as 'unspawn',
      data: event,
    })),
    ...res.data.characterTalkEvents.map(event => ({
      type: 'talk' as 'talk',
      data: event,
    })),
  ]

  return {
    id: res.data.Id,
    serialData: sortBy(payload, 'data.Time'),
  }
}
