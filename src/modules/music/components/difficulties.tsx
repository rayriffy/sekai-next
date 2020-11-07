import { Fragment, FunctionComponent, memo, useMemo, useState } from 'react'

import capitalize from 'lodash/capitalize'

import {
  getDifficultyActiveColor,
  getDifficultyColor,
} from '../services/getDifficultyColor'

import { Difficulty } from '../../../@types/Difficulty'
import { MusicDifficulty } from '../../../@types/MusicDifficulty'

interface Props {
  difficulties: MusicDifficulty[]
}

export const Difficulties: FunctionComponent<Props> = memo(props => {
  const { difficulties } = props

  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>(
    'expert'
  )
  const targetDifficulty = useMemo(
    () =>
      difficulties.find(
        difficulty => difficulty.musicDifficulty === selectedDifficulty
      ),
    [selectedDifficulty]
  )

  return (
    <Fragment>
      <div className="pt-2">
        <div className="sm:hidden">
          <select
            aria-label="Selected tab"
            className="form-select block w-full"
            value={selectedDifficulty}
            onChange={({ target: { value } }) => {
              setSelectedDifficulty(value as Difficulty)
            }}
          >
            {difficulties.map(difficulty => (
              <option
                key={`tab-difficulty-select-${difficulty.id}`}
                selected={selectedDifficulty === difficulty.musicDifficulty}
                value={difficulty.musicDifficulty}
              >
                {capitalize(difficulty.musicDifficulty)}
              </option>
            ))}
          </select>
        </div>
        <div className="hidden sm:block">
          <nav className="flex space-x-4">
            {difficulties.map(difficulty => (
              <button
                key={`tab-difficulty-button-${difficulty.id}`}
                onClick={() =>
                  setSelectedDifficulty(difficulty.musicDifficulty)
                }
                className={`px-3 py-2 font-medium text-sm leading-5 rounded-md focus:outline-none ${
                  selectedDifficulty === difficulty.musicDifficulty
                    ? getDifficultyActiveColor(difficulty.musicDifficulty)
                    : `text-gray-500 hover:text-gray-700 ${getDifficultyColor(
                        difficulty.musicDifficulty
                      )}`
                }`}
              >
                {difficulty.musicDifficulty.toLocaleUpperCase()}
              </button>
            ))}
          </nav>
        </div>
        <div className="pt-6 space-y-1 text-gray-900 uppercase">
          <div>
            <span className="font-bold">Level:</span>{' '}
            {targetDifficulty.playLevel}
          </div>
          <div>
            <span className="font-bold">Notes Count:</span>{' '}
            {targetDifficulty.playLevel}
          </div>
        </div>
      </div>
    </Fragment>
  )
})
