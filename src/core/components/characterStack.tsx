import { FunctionComponent, memo } from 'react'

import Image from 'next/image'

interface Props {
  characterIds: number[]
  keyPrefix?: string
  size?: 'md' | 'lg'
}

export const CharacterStack: FunctionComponent<Props> = memo(props => {
  const { characterIds, keyPrefix, size = 'md' } = props

  return (
    <div className="flex overflow-hidden">
      {characterIds.map((characterId, i) => (
        <div
          className={`${i !== 0 ? '-ml-2' : ''} inline-block ${
            size === 'md' ? 'h-10 w-10' : 'h-12 w-12'
          } rounded-full text-white shadow-solid`}
          key={`character-stack${
            keyPrefix ? `-${keyPrefix}` : '-'
          }${characterId}`}
        >
          <Image
            src={`/static/chara_icons/chr_ts_${characterId}.png`}
            width={128}
            height={128}
          />
        </div>
      ))}
    </div>
  )
})
