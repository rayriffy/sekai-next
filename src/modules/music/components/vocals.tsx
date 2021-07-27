import { Fragment, FunctionComponent, useState, useMemo, memo } from 'react'

import { MusicVideo } from './musicVideo'
import { getAudioFull } from '../services/getAudio'
import { CharacterStack } from '../../../core/components/characterStack'

import { MusicVocal } from '../../../@types/MusicVocal'
import { Music } from '../../../@types/Music'
import { Audio } from './audio'

interface Props {
  vocals: MusicVocal[]
  music: Music
}

export const Vocals: FunctionComponent<Props> = memo(props => {
  const { vocals, music } = props

  const [selectedVocalId, setSelectedVocalId] = useState<number>((vocals.find(o => o.musicVocalType === 'sekai') ?? vocals[0]).id)
  const targetVocal = useMemo(
    () => vocals.find(vocal => vocal.id === selectedVocalId),
    [selectedVocalId]
  )

  console.log(vocals)

  return (
    <Fragment>
      <div>
        <div className="sm:hidden">
          <select
            aria-label="Selected tab"
            className="form-select block w-full"
            value={selectedVocalId.toString()}
            onChange={({ target: { value } }) => {
              setSelectedVocalId(Number(value))
            }}
          >
            {vocals.map(vocal => (
              <option
                key={`tab-vocal-select-${vocal.id}`}
                value={vocal.id.toString()}
              >
                {vocal.caption}
              </option>
            ))}
          </select>
          <div className="pt-4">
            <CharacterStack
              characterIds={targetVocal.characters.map(
                character => character.characterId
              )}
            />
          </div>
        </div>
        <div className="hidden sm:flex sm:justify-between sm:items-center">
          <nav className="flex space-x-4">
            {vocals.map(vocal => (
              <button
                key={`tab-vocal-button-${vocal.id}`}
                onClick={() => setSelectedVocalId(vocal.id)}
                className={`px-3 py-2 font-medium text-sm leading-5 rounded-md focus:outline-none ${
                  selectedVocalId === vocal.id
                    ? 'text-blue-700 bg-blue-100 focus:text-blue-800 focus:bg-blue-200'
                    : 'text-gray-500 hover:text-gray-700 focus:text-blue-600 focus:bg-blue-50'
                }`}
              >
                {vocal.caption}
              </button>
            ))}
          </nav>
          <CharacterStack
            characterIds={targetVocal.characters.map(
              character => character.characterId
            )}
          />
        </div>
      </div>
      <div className="block sm:grid sm:grid-cols-2 gap-4">
        <div>
          <h2 className="uppercase text-gray-700 font-bold text-sm my-2">
            Short Version
          </h2>
          <Audio music={music} vocal={targetVocal} className="w-full mt-2" />
          <h2 className="uppercase text-gray-700 font-bold text-sm my-2">
            Long Version
          </h2>
          <Audio
            music={music}
            vocal={targetVocal}
            fullVersion
            className="w-full mt-2"
          />
        </div>
        <div>
          <h2 className="uppercase text-gray-700 font-bold text-sm my-2">
            Music Video
          </h2>
          <MusicVideo
            audio={getAudioFull(targetVocal.assetbundleName)}
            music={music}
            vocal={targetVocal}
          />
        </div>
      </div>
    </Fragment>
  )
})
