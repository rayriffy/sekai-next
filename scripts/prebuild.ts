import axios from 'axios'
import fs from 'fs-extra'
import path from 'path'

import { TaskQueue } from 'cwait'

import { getMusics } from '../src/core/services/getMusics'
import { getMusicVocals } from '../src/core/services/getMusicVocals'

import { MusicCategory } from '../src/@types/MusicCategory'
import { Music } from '../src/@types/Music'

const nextCachePath = path.join(__dirname, '../.next/cache/sekai-next-assets')
const nextPublicPath = path.join(__dirname, '../public/static/media')

export const getAudioShort = (
  musicVocalAssetbundleName: string,
  trimmed?: boolean
) =>
  trimmed
    ? `music/short/${musicVocalAssetbundleName}_rip/${musicVocalAssetbundleName}_short.mp3`
    : `https://sekai-res.dnaroma.eu/file/sekai-assets/music/short/${musicVocalAssetbundleName}_rip/${musicVocalAssetbundleName}_short.mp3`
export const getAudioFull = (
  musicVocalAssetbundleName: string,
  trimmed?: boolean
) =>
  trimmed
    ? `music/long/${musicVocalAssetbundleName}_rip/${musicVocalAssetbundleName}.mp3`
    : `https://sekai-res.dnaroma.eu/file/sekai-assets/music/long/${musicVocalAssetbundleName}_rip/${musicVocalAssetbundleName}.mp3`

export const getMusicVideo = (
  musicId: number,
  musicCategories: MusicCategory,
  trimmed?: boolean
) => {
  const mode =
    musicCategories === 'original'
      ? 'original_mv'
      : musicCategories === 'mv_2d'
      ? 'sekai_mv'
      : ''
  const paddedMusicId = String(musicId).padStart(4, '0')

  const fileNameSpecialCases = [
    [144, 'ainomaterial'],
    [143, 'traffic_jam'],
    [149, 'kanadetomosusora'],
    [156, 'beateater'],
  ]
  const fileName = fileNameSpecialCases.find(o => o[0] === musicId) !== undefined ? fileNameSpecialCases.find(o => o[0] === musicId)[1] : paddedMusicId

  return trimmed
    ? `live/2dmode/${mode}/${paddedMusicId}_rip/${paddedMusicId}.mp4`
    : `https://sekai-res.dnaroma.eu/file/sekai-assets/live/2dmode/${mode}/${paddedMusicId}_rip/${fileName}.mp4`
}

const fetchCache = async (
  remoteUrl: string,
  localPath: string,
) => {
  try {
    if (!fs.existsSync(localPath)) {
      const res = await axios.get(remoteUrl, {
        responseType: 'arraybuffer',
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_2_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36 Edg/89.0.774.63',
          origin: 'https://sekai.best',
        },
      })

      if (!fs.existsSync(path.dirname(localPath))) {
        fs.mkdirSync(path.dirname(localPath), { recursive: true })
      }

      fs.writeFileSync(localPath, Buffer.from(res.data))
    }
  } catch (e) {
    console.error(e)
    console.log(remoteUrl)
  }
}

;(async () => {
  const musics = await getMusics()
  const vocals = await getMusicVocals()

  const queue = new TaskQueue(Promise, 5)

  console.log('downloading musics...')
  const allMusicVocalURL = await Promise.all(
    musics.map(
      queue.wrap<void, Music>(async music => {
        const targetVocals = vocals.filter(vocal => vocal.musicId === music.id)

        await Promise.all(
          targetVocals.map(async musicVocal => {
            await Promise.all([
              fetchCache(
                getAudioFull(musicVocal.assetbundleName),
                path.join(
                  nextCachePath,
                  getAudioFull(musicVocal.assetbundleName, true)
                )
              ),
              fetchCache(
                getAudioShort(musicVocal.assetbundleName),
                path.join(
                  nextCachePath,
                  getAudioShort(musicVocal.assetbundleName, true)
                )
              ),
            ])
          })
        )
      })
    )
  )

  console.log('downloading videos...')
  const allMusicVideoURL = await Promise.all(
    musics.map(
      queue.wrap<void, Music>(async music => {
        const filteredMusicCategory = music.categories.filter(category =>
          ['original', 'mv_2d'].includes(category)
        )

        await Promise.all(filteredMusicCategory.map(async category =>
          await fetchCache(
            getMusicVideo(music.id, category),
            path.join(nextCachePath, getMusicVideo(music.id, category, true))
          )
        ))
      })
    )
  )

  // copy all to public
  console.log('copy to public...')
  if (!fs.existsSync(nextPublicPath)) {
    fs.mkdirSync(nextPublicPath, { recursive: true })
  }

  fs.copySync(nextCachePath, nextPublicPath, {
    overwrite: false,
  })
})()
