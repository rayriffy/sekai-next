import { Music } from '../../../@types/Music'
import { MusicVocal } from '../../../@types/MusicVocal'
import { getMusicCover } from '../../musics/services/getMusicCover'

export const getMediaMetadata = (
  music: Pick<Music, 'title' | 'composer' | 'assetbundleName'>,
  vocal: Pick<MusicVocal, 'caption'>
) =>
  new MediaMetadata({
    title: music.title,
    artist: music.composer,
    album: vocal.caption,
    artwork: [
      {
        src: getMusicCover(music.assetbundleName),
        sizes: '740x740',
        type: 'image/webp',
      },
    ],
  })
