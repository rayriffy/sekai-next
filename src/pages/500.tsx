import { NextPage } from 'next'

import { ServerIcon } from '@heroicons/react/outline'

const Page: NextPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex justify-center items-center">
      <ServerIcon className="w-8 h-8 text-gray-500" />
    </div>
  )
}

export default Page
