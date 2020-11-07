import { Fragment, FunctionComponent, useState, useMemo } from 'react'

import { getAudioFull, getAudioShort } from '../services/getAudio'

import { MusicVocal } from '../../../@types/MusicVocal'

interface Props {
  vocals: MusicVocal[]
  fullVer?: boolean
}

export const Vocals: FunctionComponent<Props> = props => {
  const { vocals, fullVer = false } = props

  const [selectedVocalId, setSelectedVocalId] = useState<number>(vocals[0].id)
  const targetVocal = useMemo(
    () => vocals.find(vocal => vocal.id === selectedVocalId),
    [selectedVocalId]
  )

  return (
    <Fragment>
      <div className="">
        <h2 className="uppercase text-gray-700 font-bold text-sm mb-2">
          {fullVer ? 'Long' : 'Short'} Version
        </h2>
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
                selected={selectedVocalId === vocal.id}
                value={vocal.id.toString()}
              >
                {vocal.caption}
              </option>
            ))}
          </select>
        </div>
        <div className="hidden sm:block">
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
        </div>
      </div>
      <audio
        controls
        className="w-full mt-2"
        src={
          fullVer
            ? getAudioFull(targetVocal.assetbundleName)
            : getAudioShort(targetVocal.assetbundleName)
        }
      ></audio>
    </Fragment>
  )
}
