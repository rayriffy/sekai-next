import { FunctionComponent, memo, useMemo } from 'react'

import Image from 'next/image'

import { VirtualLive } from '../../@types/VirtualLive'

interface Props {
  virtualLive: VirtualLive
}

export const VirtualLiveCard: FunctionComponent<Props> = memo(props => {
  const { virtualLive } = props

  return (
    <div className="flex justify-center">
      <Image
        width={790}
        height={243}
        src={`https://sekai-res.dnaroma.eu/file/sekai-assets/virtual_live/select/banner/${virtualLive.assetbundleName}_rip/${virtualLive.assetbundleName}.png`}
        className="w-full h-auto"
      />
    </div>
  )
})
