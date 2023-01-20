import { FunctionComponent, memo, useMemo } from 'react'

import Link from 'next/link'

interface Props {
  max: number
  current: number
  className?: string
  prefix?: string
}

interface PageProps {
  startPoint: number
  current: number
  i: number
}

const Page: FunctionComponent<PageProps> = memo(props => {
  const { startPoint, current, i } = props

  return (
    <div
      className={`cursor-pointer ${
        startPoint + i + 1 === current ? 'text-gray-900' : 'text-gray-500'
      }`}
    >
      {startPoint + i + 1}
    </div>
  )
})

export const Pagination: FunctionComponent<Props> = memo(props => {
  const { max, current, prefix = '/', className = '' } = props

  const pageLength = useMemo(() => (max > 5 ? 5 : max), [max])
  const startPoint = useMemo(
    () =>
      max > 5
        ? current - 2 < 1
          ? 0
          : current + 2 > max
          ? max - pageLength
          : current - (pageLength - 2)
        : 0,
    [max, current, pageLength]
  )

  return (
    <div className={`flex justify-center space-x-8 ${className}`}>
      {Array.from({ length: pageLength }, (_, i) => (
        <Link
          key={`pagination-${startPoint + i}`}
          href={
            startPoint + i === 0 ? prefix : `${prefix}p/${startPoint + i + 1}`
          }
        >
          <Page {...{ startPoint, i, current }} />
        </Link>
      ))}
    </div>
  )
})
