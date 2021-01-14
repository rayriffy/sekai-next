import { FunctionComponent, memo, useContext } from 'react'

import { CharacterColorCode } from './overviewCard'

interface Props {
  title: string
  content: string
}

export const SectionSmall: FunctionComponent<Props> = memo(props => {
  const { title, content } = props
  const color = useContext(CharacterColorCode)

  return (
    <div className="flex">
      <span
        className="px-4 py-1 rounded-full text-white text-md mr-2"
        style={{ backgroundColor: color }}
      >
        {title}
      </span>
      <p
        className="text-md pl-2 border-b-4 border-dotted w-full"
        style={{ borderColor: color }}
      >
        {content}
      </p>
    </div>
  )
})

export const SectionLarge: FunctionComponent<Props> = memo(props => {
  const { title, content } = props
  const color = useContext(CharacterColorCode)

  return (
    <div
      className="flex border-b-4 border-dotted pb-6"
      style={{ borderColor: color }}
    >
      <span
        className="px-4 py-1 rounded-full text-white text-md mr-2"
        style={{ backgroundColor: color }}
      >
        {title}
      </span>
      <p className="text-md pl-2">{content}</p>
    </div>
  )
})

export const SectionSpecial: FunctionComponent<Props> = memo(props => {
  const { title, content } = props
  const color = useContext(CharacterColorCode)

  return (
    <div
      className="flex border-b-4 border-dotted lg:border-none pb-6 lg:pb-0"
      style={{ borderColor: color }}
    >
      <span
        className="px-4 py-1 rounded-full text-white text-lg mr-2"
        style={{ backgroundColor: color }}
      >
        {title}
      </span>
      <p className="text-lg pl-2">{content}</p>
    </div>
  )
})
