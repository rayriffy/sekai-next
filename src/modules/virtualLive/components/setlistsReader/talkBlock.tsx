import React from 'react'
import { FunctionComponent, memo } from 'react'

import { CharacterStack } from '../../../../core/components/characterStack'

import { CharacterTalkEvent } from '../../../../@types/CharacterTalkEvent'

interface Props {
  character3dIds: number[]
  event: CharacterTalkEvent
  character3dIndex: {
    id: number
    charId: number
  }[]
}

export const TalkBlock: FunctionComponent<Props> = memo(props => {
  const { character3dIds, character3dIndex, event } = props

  return (
    <div>
      <CharacterStack
        characterIds={character3dIds.map(
          o => character3dIndex.find(p => p.id === o).charId
        )}
      />
      <p className="text-gray-700 mt-2">{event.Serif}</p>
    </div>
  )
})
