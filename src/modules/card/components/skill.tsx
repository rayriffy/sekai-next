import { FunctionComponent, memo } from 'react'

import { Card } from '../../../@types/Card'

interface Props {
  card: Card
}

export const Skill: FunctionComponent<Props> = memo(props => {
  const { card } = props

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
    </div>
  )
})
