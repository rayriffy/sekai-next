import { FunctionComponent, useMemo } from 'react'

interface Props {
  current: number
  max: number
}

export const ProgressBar: FunctionComponent<Props> = props => {
  const { current, max } = props

  const progress = useMemo(
    () => ((current * 100) / max).toFixed(2),
    [current, max]
  )

  return (
    <div className="rounded-full w-full border-2 border-black">
      <div className="rounded-full w-full border-2 border-white">
        <div
          className="rounded-full bg-teal-400 py-1.5"
          style={{
            width: `${progress}%`,
          }}
        ></div>
      </div>
    </div>
  )
}
