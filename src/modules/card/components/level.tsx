import { FunctionComponent, memo, useCallback, useEffect, useMemo } from 'react'

import { ProgressBar } from '../../../app/components/progressBar'

interface Props {
  onSelected(level: number): void
  afterTraining: boolean
  cardRarity: number
  level: number
}

export const LevelSelector: FunctionComponent<Props> = memo(props => {
  const { onSelected, afterTraining, cardRarity, level } = props

  const minimumSafeLevel = useMemo(
    () => (afterTraining ? (cardRarity + 1) * 10 : 1),
    [afterTraining]
  )
  const maxLevel = useMemo(
    () => (cardRarity + 1) * 10 + (afterTraining ? 10 : 0),
    [afterTraining]
  )

  useEffect(() => {
    if (!afterTraining && level > maxLevel) {
      onSelected(maxLevel)
    } else if (afterTraining && level < minimumSafeLevel) {
      onSelected(minimumSafeLevel)
    }
  }, [maxLevel])

  const onSetLevel = useCallback<(level: number) => void>(level => {
    onSelected(level)
  }, [])

  return (
    <div className="bg-white rounded-xl border-2 border-teal-200 p-6">
      <div className="flex items-center pb-1">
        <div className="rounded-full text-white bg-teal-400 px-4 py-1">
          Level
        </div>
      </div>
      <div className="py-2 grid grid-cols-1 xl:grid-cols-5 gap-4">
        <div className="col-span-3">
          <div className="inline-flex items-end">
            <span className="font-medium text-xl text-gray-700 tracking-wider">
              Lv. {level}/
            </span>
            <span className="text-gray-700 tracking-wider leading-relaxed">
              {maxLevel}
            </span>
          </div>
          <div className="pt-0">
            <ProgressBar max={maxLevel} current={level} />
          </div>
        </div>
        <div className="col-span-2 flex items-center justify-center pt-2">
          <span className="relative z-0 inline-flex shadow-sm rounded-md">
            <button
              type="button"
              disabled={level - 5 < minimumSafeLevel}
              onClick={() => onSetLevel(level - 5)}
              className={`${
                level - 5 < minimumSafeLevel
                  ? 'bg-gray-200 cursor-not-allowed'
                  : 'bg-white'
              } relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150`}
            >
              -5
            </button>
            <button
              type="button"
              disabled={level - 1 < minimumSafeLevel}
              onClick={() => onSetLevel(level - 1)}
              className={`${
                level - 1 < minimumSafeLevel
                  ? 'bg-gray-200 cursor-not-allowed'
                  : 'bg-white'
              } -ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150`}
            >
              -1
            </button>
            <button
              type="button"
              disabled={level + 1 > maxLevel}
              onClick={() => onSetLevel(level + 1)}
              className={`${
                level + 1 > maxLevel
                  ? 'bg-gray-200 cursor-not-allowed'
                  : 'bg-white'
              } -ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150`}
            >
              +1
            </button>
            <button
              type="button"
              disabled={level + 5 > maxLevel}
              onClick={() => onSetLevel(level + 5)}
              className={`${
                level + 5 > maxLevel
                  ? 'bg-gray-200 cursor-not-allowed'
                  : 'bg-white'
              } -ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150`}
            >
              +5
            </button>
          </span>
        </div>
      </div>
    </div>
  )
})
