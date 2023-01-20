import { Fragment, FunctionComponent, useState } from 'react'

import dayjs from 'dayjs'

import { ExclamationIcon } from '@heroicons/react/outline'
import { mergeTalkEvent } from '../../services/mergeTalkEvent'
import { TalkBlock } from './talkBlock'

import { TransformedSetlist } from '../../../../@types/TransformedSetlist'
import { CharacterTalkEvent } from '../../../../@types/CharacterTalkEvent'
import { MusicBlock } from './musicBlock'

interface Props {
  setlists: TransformedSetlist[]
  liveEndAt: number
  character3dIndex: {
    id: number
    charId: number
  }[]
}

export const SetlistsReader: FunctionComponent<Props> = props => {
  const { setlists, liveEndAt, character3dIndex } = props

  const [spoiler, setSpoiler] = useState(dayjs().isBefore(dayjs(liveEndAt)))

  return (
    <Fragment>
      {spoiler ? (
        <div className="w-full flex justify-center items-center">
          <div className="max-w-md text-center py-8">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
              <ExclamationIcon className="h-6 w-6 text-red-600" />
            </div>
            <h2 className="mt-2 font-bold text-lg text-gray-900">
              Spoiler Alert!
            </h2>
            <p className="text-gray-700 text-sm">
              This virtual live does not ended yet. You should watch virtual
              live in the game first, otherwise it will be a spoiler for you.
            </p>
            <p className="text-gray-700 text-sm font-medium">
              Do you want to proceed?
            </p>
            <div className="mt-4 flex justify-center">
              <button
                type="button"
                onClick={() => setSpoiler(false)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Fragment>
          <div className="px-4 max-w-4xl mx-auto">
            {setlists.map((setlist, i) => (
              <Fragment>
                {i !== 0 ? (
                  <div
                    key={`setlist-${setlist.seq}`}
                    className="mx-6 my-8 border-t border-gray-200"
                  />
                ) : null}
                <div key={`setlist-${setlist.seq}`} className="space-y-4">
                  {setlist.type === 'mc' ? (
                    <Fragment>
                      <h1 className="text-xl text-gray-900 font-bold">
                        Talk que
                      </h1>
                      {mergeTalkEvent(
                        setlist.data.serialData
                          .filter(o => o.type === 'talk')
                          .map(o => o.data as CharacterTalkEvent)
                      ).map(talk => (
                        <TalkBlock
                          mcId={setlist.data.id}
                          {...{ character3dIndex, ...talk }}
                        />
                      ))}
                    </Fragment>
                  ) : (
                    <Fragment>
                      <h1 className="text-xl text-gray-900 font-bold">
                        Music que
                      </h1>
                      <MusicBlock {...setlist.data} />
                    </Fragment>
                  )}
                </div>
              </Fragment>
            ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}
