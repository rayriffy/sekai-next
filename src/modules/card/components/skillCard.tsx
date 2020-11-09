import { FunctionComponent, memo, useState } from 'react'

import { getSkillDescription } from '../services/getSkillDescription'
import { ProgressBar } from '../../../app/components/progressBar'

import { Card } from '../../../@types/Card'
import { Skill } from '../../../@types/Skill'

interface Props {
  card: Card
  skill: Skill
}

export const SkillCard: FunctionComponent<Props> = memo(props => {
  const { card, skill } = props

  const [selectedLevel, setSelectedLevel] = useState<number>(4)

  return (
    <div className="bg-white rounded-xl border-2 border-teal-200 p-6">
      <div className="flex items-center">
        <div>
          <div className="rounded-full text-white bg-teal-400 px-4 py-1">
            Skill
          </div>
        </div>
        <div className="ml-4 flex items-center">
          <span className="text-xl text-gray-700 font-medium">
            {card.cardSkillName}
          </span>
        </div>
      </div>
      <div className="pt-2 pb-4 grid grid-cols-5 gap-4">
        <div className="col-span-3">
          <div className="inline-flex items-end">
            <span className="font-medium text-xl text-gray-700 tracking-wider">
              Lv. {selectedLevel}/
            </span>
            <span className="text-gray-700 tracking-wider leading-relaxed">
              4
            </span>
          </div>
          <div className="pt-0">
            <ProgressBar max={4} current={selectedLevel} />
          </div>
        </div>
        <div className="col-span-2 flex items-center justify-center pt-2">
          <span className="relative z-0 inline-flex shadow-sm rounded-md">
            <button
              type="button"
              disabled={selectedLevel <= 1}
              onClick={() => setSelectedLevel(o => o - 1)}
              className={`${
                selectedLevel <= 1
                  ? 'bg-gray-200 cursor-not-allowed'
                  : 'bg-white'
              } relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150`}
            >
              -
            </button>
            <button
              type="button"
              disabled={selectedLevel >= 4}
              onClick={() => setSelectedLevel(o => o + 1)}
              className={`${
                selectedLevel >= 4
                  ? 'bg-gray-200 cursor-not-allowed'
                  : 'bg-white'
              } -ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150`}
            >
              +
            </button>
          </span>
        </div>
      </div>
      <div className="pt-4 border-t-2 border-teal-300 pb-4">
        {getSkillDescription(skill, selectedLevel)}
      </div>
    </div>
  )
})
