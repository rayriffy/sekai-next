import { Fragment, FunctionComponent, useState, useMemo } from 'react'

import { MusicVocal } from '../../../@types/MusicVocal'

interface Props {
  vocals: MusicVocal[]
}

export const Vocals: FunctionComponent<Props> = props => {
  const { vocals } = props

  const [selectedVocalId, setSelectedVocalId] = useState<number>(vocals[0].id)
  const targetVocal = useMemo(
    () => vocals.find(vocal => vocal.id === selectedVocalId),
    [selectedVocalId]
  )

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
                    ? 'text-indigo-700 bg-indigo-100 focus:text-indigo-800 focus:bg-indigo-200'
                    : 'text-gray-500 hover:text-gray-700 focus:text-indigo-600 focus:bg-indigo-50'
                }`}
              >
                {vocal.caption}
              </button>
            ))}
          </nav>
        </div>
      </div>
      <div>{JSON.stringify(targetVocal)}</div>
    </Fragment>
  )
}
