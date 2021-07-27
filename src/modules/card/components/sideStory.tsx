import {
  FunctionComponent,
  memo,
  DetailedHTMLProps,
  ButtonHTMLAttributes,
} from 'react'

import Image from 'next/image'

import { CardEpisode } from '../../../@types/CardEpisode'

interface InternalEpisode {
  locked: boolean
  onToggle(): void
}

interface Props {
  episodes: Pick<CardEpisode, 'title'>[]
  episode1: InternalEpisode
  episode2: InternalEpisode
}

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  title: string
  data: InternalEpisode
}

export const SideStory: FunctionComponent<Props> = memo(props => {
  const { episodes, episode1, episode2 } = props

  return (
    <div className="flex justify-center space-x-4">
      <Button data={episode1} title={episodes[0].title} />
      <Button data={episode2} title={episodes[1].title} />
    </div>
  )
})

const Button: FunctionComponent<ButtonProps> = memo(props => {
  const { title, data, ...rest } = props

  return (
    <div className="relative">
      {data.locked && (
        <div className="absolute left-0 z-20 mt-1.5 -ml-2.5">
          <div className="w-5 h-5">
            <Image src="/static/lock.png" width={48} height={48} />
          </div>
        </div>
      )}
      <button
        className={`bg-white rounded-md border-4 border-gray-300 p-1 text-gray-900 text-sm relative z-10 focus:outline-none focus:border-teal-300 focus:shadow-outline-indigo transition ease-in-out duration-150`}
        onClick={data.onToggle}
        {...rest}
      >
        {title}
      </button>
      <div
        className="absolute top-0 bottom-0 left-0 right-0 -mb-0.5 bg-black rounded-md"
        style={{
          transform: 'scaleX(1.02) scaleY(1.05)',
        }}
      ></div>
    </div>
  )
})
