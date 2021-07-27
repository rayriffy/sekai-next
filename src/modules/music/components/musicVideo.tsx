import { FunctionComponent, memo, useMemo, useState, Fragment } from 'react'

import { Video } from './video'
import { getMusicVideo } from '../services/getMusicVideo'
import { musicCategoryToLocaleText } from '../services/musicCategoryToLocaleText'

import { Music } from '../../../@types/Music'
import { MusicCategory } from '../../../@types/MusicCategory'
import { MusicVocal } from '../../../@types/MusicVocal'

interface Props {
  audio: string
  music: Pick<
    Music,
    'title' | 'composer' | 'assetbundleName' | 'categories' | 'id'
  >
  vocal: Pick<MusicVocal, 'caption'>
}

export const MusicVideo: FunctionComponent<Props> = memo(props => {
  const { music } = props

  // remove 'music' category away
  const filteredMusicCategory = useMemo(
    () =>
      music.categories.filter(category =>
        ['original', 'mv_2d'].includes(category)
      ),
    []
  )
  const [selectedCategory, setSelectedCategory] = useState<MusicCategory>(
    filteredMusicCategory[0]
  )

  return (
    <div>
      {selectedCategory === undefined ? (
        <div className="aspect-w-16 aspect-h-9 border-4 border-dashed border-gray-200 relative pointer-events-none select-none">
          <div className="absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center font-bold text-gray-500">
            Unavailable
          </div>
        </div>
      ) : (
        <Fragment>
          {filteredMusicCategory.length > 1 ? (
            <nav className="flex space-x-4 pb-2">
              {filteredMusicCategory.map(category => (
                <button
                  key={`tab-mv-button-${category}`}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-2 py-1 font-medium text-xs leading-5 rounded-md focus:outline-none ${
                    selectedCategory === category
                      ? 'text-blue-700 bg-blue-100 focus:text-blue-800 focus:bg-blue-200'
                      : 'text-gray-500 hover:text-gray-700 focus:text-blue-600 focus:bg-blue-50'
                  }`}
                >
                  {musicCategoryToLocaleText(category)}
                </button>
              ))}
            </nav>
          ) : null}
          <Video video={getMusicVideo(music.id, selectedCategory)} {...props} />
        </Fragment>
      )}
    </div>
  )
})
