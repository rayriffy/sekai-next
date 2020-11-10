import { FunctionComponent, memo } from 'react'

interface Props {
  title: string
  content: string
}

export const SectionSmall: FunctionComponent<Props> = memo(props => {
  const { title, content } = props

  return (
    <div className="flex">
      <span className="px-4 py-1 rounded-full bg-teal-400 text-white text-lg mr-2">
        {title}
      </span>
      <p className="text-lg pl-2 border-b-4 border-dotted border-teal-400 w-full">
        {content}
      </p>
    </div>
  )
})

export const SectionLarge: FunctionComponent<Props> = memo(props => {
  const { title, content } = props

  return (
    <div className="flex border-b-4 border-dotted pb-6 border-teal-400">
      <span className="px-4 py-1 rounded-full bg-teal-400 text-white text-lg mr-2">
        {title}
      </span>
      <p className="text-lg pl-2">{content}</p>
    </div>
  )
})
