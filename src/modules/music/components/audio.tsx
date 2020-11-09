import {
  DetailedHTMLProps,
  AudioHTMLAttributes,
  FunctionComponent,
  useRef,
  memo,
  useEffect,
  useCallback,
} from 'react'

import { getAudioFull, getAudioShort } from '../services/getAudio'
import { getMediaMetadata } from '../services/getMediaMetadata'

import { Music } from '../../../@types/Music'
import { MusicVocal } from '../../../@types/MusicVocal'

interface Props
  extends DetailedHTMLProps<
    AudioHTMLAttributes<HTMLAudioElement>,
    HTMLAudioElement
  > {
  music: Music
  vocal: MusicVocal
  fullVersion?: boolean
}

export const Audio: FunctionComponent<Props> = memo(props => {
  const { music, vocal, fullVersion = false, ...rest } = props

  const audioRef = useRef<HTMLAudioElement>(null)

  const onPlay = useCallback(() => {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = getMediaMetadata(music, vocal)

      navigator.mediaSession.setActionHandler('play', () => {
        audioRef.current?.play()
      })
      navigator.mediaSession.setActionHandler('pause', () => {
        audioRef.current?.pause()
      })
    }
  }, [])

  return (
    <audio controls onPlay={onPlay} ref={audioRef} {...rest}>
      <source
        src={
          fullVersion
            ? getAudioFull(vocal.assetbundleName)
            : getAudioShort(vocal.assetbundleName)
        }
        type="audio/mp3"
      ></source>
    </audio>
  )
})
