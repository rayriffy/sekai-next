import { FunctionComponent } from 'react'

interface Props {
  title: string
}

export const CardHeading: FunctionComponent<Props> = props => {
  const { title, children } = props

  return (
    <div className="bg-white rounded-md shadow">
      <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
      </div>
      <div className="px-4 py-5 sm:px-6">{children}</div>
    </div>
  )
}
