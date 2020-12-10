import { FunctionComponent, memo } from 'react'

export const NotFound: FunctionComponent = memo(props => {
  return (
    <div className="max-w-xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <video
          src="https://media.tenor.com/videos/2bd91e4765588e1b7ca31f90c4deeea7/mp4"
          loop
          autoPlay
          muted
          className="w-full h-auto rounded-t-lg"
        ></video>
        <div className="px-4 py-4 sm:px-6">
          <h1 className="font-bold text-2xl text-gray-800">Not Found</h1>
          <p className="pt-0.5 text-gray-600">
            The page you were looking for doesn't exist
          </p>
        </div>
      </div>
    </div>
  )
})
