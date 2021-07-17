import axios from 'axios'
import fs from 'fs-extra'
import path from 'path'
import { flattenDeep } from 'lodash'

import { TaskQueue } from 'cwait'
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg'

import { getMusics } from '../src/core/services/getMusics'
import { getMusicVocals } from '../src/core/services/getMusicVocals'
import { updateMetadata } from './functions/updateMetadata'

import { getAudioFull, getAudioShort } from './functions/getAudio'
import { getMusicVideo } from './functions/getMusicVideo'

import { Music } from '../src/@types/Music'
import { getMetadata } from './functions/getMetadata'

const ffmpegQueue = new TaskQueue(Promise, 1)
const ffmpeg = createFFmpeg({
  log: true
})

const nextCachePath = path.join(__dirname, '../.next/cache/sekai-next-assets')
const nextPublicPath = path.join(__dirname, '../public/static/media')

const fetchCache = async (remoteUrl: string, localPath: string) => {
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

      updateMetadata(remoteUrl, {
        trimmed: false,
      })
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
  await Promise.all(
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
  await Promise.all(
    musics.map(
      queue.wrap<void, Music>(async music => {
        const filteredMusicCategory = music.categories.filter(category =>
          ['original', 'mv_2d'].includes(category)
        )

        await Promise.all(
          filteredMusicCategory.map(
            async category =>
              await fetchCache(
                getMusicVideo(music.id, category),
                path.join(
                  nextCachePath,
                  getMusicVideo(music.id, category, true)
                )
              )
          )
        )
      })
    )
  )

  /*
  console.log('postprocessing...')
  interface Item {
    remote: string
    local: string
    fillerSec: number
    type: string
  }

  const musicUrls = flattenDeep<Item>(
    musics.map(music => {
      const targetVocals = vocals.filter(vocal => vocal.musicId === music.id)
      return targetVocals.map(musicVocal => ({
        remote: getAudioFull(musicVocal.assetbundleName),
        local: path.join(
          nextCachePath,
          getAudioFull(musicVocal.assetbundleName, true)
        ),
        fillerSec: music.fillerSec,
        type: 'mp3',
      }))
    })
  )
  const videoUrls = flattenDeep<Item>(
    musics.map(music => {
      const filteredMusicCategory = music.categories.filter(category =>
        ['original', 'mv_2d'].includes(category)
      )

      return filteredMusicCategory.map(category => ({
        remote: getMusicVideo(music.id, category),
        local: path.join(
          nextCachePath,
          getMusicVideo(music.id, category, true)
        ),
        fillerSec: music.fillerSec,
        type: 'mp4',
      }))
    })
  )

  await Promise.all(
    [...musicUrls, ...videoUrls].map(ffmpegQueue.wrap<void, Item>(async item => {
      if (!ffmpeg.isLoaded()) {
        await ffmpeg.load()
      }

      const metadata = getMetadata(item.remote)
      if (!(metadata?.data?.trimmed ?? false)) {
        // load file
        ffmpeg.FS('writeFile', `input.${item.type}`, await fetchFile(item.local))
        await ffmpeg.run('-ss', `${item.fillerSec}`, '-i', `input.${item.type}`, `output.${item.type}`)
        await fs.promises.writeFile(item.local, ffmpeg.FS('readFile', `output.${item.type}`))

        updateMetadata(item.remote, {
          trimmed: true
        })
      }
    }))
  )
  */

  // copy all to public
  console.log('copy to public...')
  if (!fs.existsSync(nextPublicPath)) {
    fs.mkdirSync(nextPublicPath, { recursive: true })
  }

  fs.copySync(nextCachePath, nextPublicPath, {
    overwrite: false,
  })
})()
