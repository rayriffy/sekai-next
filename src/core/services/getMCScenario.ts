import axios from 'axios'
import sortBy from 'lodash/sortBy'
import moize from 'moize'

import { MasterOfCermonyData } from '../../@types/MasterOfCermonyData'
import { MCSerialData } from '../../@types/MCSerialData'

export const getMCScenario = moize.promise(
  async (virtualLiveSetlistAssetBundleName: string) => {
    const res = await axios.get<MasterOfCermonyData>(
      `https://minio.dnaroma.eu/sekai-assets/virtual_live/mc/scenario/${virtualLiveSetlistAssetBundleName}_rip/${virtualLiveSetlistAssetBundleName}.asset`,
      {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_2_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36 Edg/89.0.774.63',
          origin: 'https://sekai.best',
        },
      }
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
)
