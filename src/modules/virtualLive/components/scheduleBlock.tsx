import { FunctionComponent, memo, ReactText } from 'react'

interface Props {
  time: ReactText
  date?: ReactText
}

export const ScheduleBlock: FunctionComponent<Props> = memo(props => (
  <div className="rounded-lg border-2 border-emerald-100 bg-yellow-50 p-3 text-center text-gray-900">
    <h2 className="font-bold text-lg">{props.time}</h2>
    {props.date && (
      <h3 className="font-medium text-sm capitalize">{props.date}</h3>
    )}
  </div>
))
