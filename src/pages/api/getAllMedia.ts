import { NextApiHandler } from 'next'

import { flattenDeep } from 'lodash'

import { getMusics } from '../../core/services/getMusics'
import { getMusicVocals } from '../../core/services/getMusicVocals'

import {
  getAudioFull,
  getAudioShort,
} from '../../modules/music/services/getAudio'
import { getMusicVideo } from '../../modules/music/services/getMusicVideo'

// get all audio and video
const api: NextApiHandler = async (req, res) => {
  /**
   *  Music vocals
   */
  const musics = await getMusics()
  const vocals = await getMusicVocals()

  const allMusicVocalURL = musics.map(music => {
    const targetVocals = vocals.filter(vocal => vocal.musicId === music.id)

    return [
      ...targetVocals.map(musicVocal => {
        return [
          getAudioFull(musicVocal.assetbundleName),
          getAudioShort(music.assetbundleName),
        ]
      }),
    ]
  })

  /**
   * Music videos
   */
  const allMusicVideoURL = musics.map(music => {
    const filteredMusicCategory = music.categories.filter(category =>
      ['original', 'mv_2d'].includes(category)
    )

    return filteredMusicCategory.map(category => getMusicVideo(music.id, category))
  })

  return res.send(flattenDeep(
    [allMusicVocalURL, allMusicVideoURL]
  ))
}

export default api
