import { FunctionComponent, memo, useCallback, useRef } from 'react'

import { CharacterStack } from '../../../../core/components/characterStack'
import { getVoiceUrl } from '../../services/getVoiceUrl'

// import { VolumeUpIcon } from '@heroicons/react/outline'

interface Props {
  character3dIds: number[]
  voiceKeys: string[]
  order: number
  text: string
  mcId: string
  character3dIndex: {
    id: number
    charId: number
  }[]
}

export const TalkBlock: FunctionComponent<Props> = memo(props => {
  const { character3dIds, character3dIndex, mcId, order, text, voiceKeys } =
    props

  // const audioRef = useRef<HTMLAudioElement>(null)
  // const audioRefArray = useRef<HTMLAudioElement[]>(new Array())

  // const onClick = useCallback(() => {
  //   // filter illegal element which is null when component unmount
  //   const filteredElements = audioRefArray.current.filter(el => el !== null)

  //   // if paused then start over, otherwise just stop
  //   if (filteredElements[0].paused) {
  //     // reset
  //     filteredElements.map(el => (el.currentTime = 0))
  //     filteredElements.map(el => el.play())
  //   } else {
  //     filteredElements.map(el => el.pause())
  //   }
  // }, [audioRefArray])

  return (
    <div className="flex justify-between items-center">
      <div className="pr-6">
        <CharacterStack
          keyPrefix={`mc-${mcId}-order-${order}`}
          characterIds={character3dIds.map(
            o => character3dIndex.find(p => p.id === o).charId
          )}
        />
        <p className="text-gray-700 mt-2">{text}</p>
      </div>
      {/* <div>
        <button
          type="button"
          onClick={onClick}
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          <VolumeUp className="h-5 w-5" />
        </button>
      </div>
      {voiceKeys.map(voiceKey => (
        <audio
          ref={el => audioRefArray.current.push(el)}
          key={`audio-mc-${mcId}-voice-${voiceKey}`}
          src={getVoiceUrl(mcId, voiceKey)}
        />
      ))} */}
    </div>
  )
})
