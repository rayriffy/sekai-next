import {
  FunctionComponent,
  memo,
  useCallback,
  useEffect,
  useState,
  useRef,
} from 'react'

import dynamic from 'next/dynamic'

import { getMediaMetadata } from '../services/getMediaMetadata'

import { Music } from '../../../@types/Music'
import { MusicVocal } from '../../../@types/MusicVocal'

interface Props {
  music: Pick<Music, 'title' | 'composer' | 'assetbundleName'>
  vocal: Pick<MusicVocal, 'caption'>
  audio: string
  video: string
}

const Component: FunctionComponent<Props> = memo(props => {
  const { audio, video, music, vocal } = props

  const audioRef = useRef<HTMLAudioElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const [playable, setPlayable] = useState<boolean>(false)

  // reset timecode if vocals (audio) or mv updated
  useEffect(() => {
    setPlayable(false)

    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      audioRef.current.load()
      audioRef.current.addEventListener('canplay', () => setPlayable(true))
      audioRef.current.addEventListener('loadstart', () => setPlayable(false))
    }

    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
      videoRef.current.load()
    }
  }, [audio, video, vocal])

  // match audio timecode with video
  const syncAudioTimecode = (currentTime: number) => {
    audioRef.current!.currentTime = currentTime
  }

  const onPlay = useCallback<(currentTime: number) => void>(currentTime => {
    syncAudioTimecode(currentTime)
    // play audio
    audioRef.current.play()
    videoRef.current.play()

    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = getMediaMetadata(music, vocal)

      navigator.mediaSession.setActionHandler('play', () => {
        onPlay(videoRef.current.currentTime)
      })
      navigator.mediaSession.setActionHandler('pause', () => {
        onPause(videoRef.current.currentTime)
      })
    }
  }, [])

  const onPause = useCallback<(currentTime: number) => void>(currentTime => {
    syncAudioTimecode(currentTime)
    // pause audio
    audioRef.current.pause()
    videoRef.current.pause()
  }, [])

  const onEnded = useCallback<(currentTime: number) => void>(currentTime => {
    syncAudioTimecode(currentTime)
    // pause audio
    audioRef.current.pause()
    videoRef.current.pause()
  }, [])

  const onSeeked = useCallback<(currentTime: number) => void>(currentTime => {
    syncAudioTimecode(currentTime)
  }, [])

  return (
    <div>
      <video
        controls={playable}
        onPlay={e => onPlay(e.currentTarget.currentTime)}
        onPause={e => onPause(e.currentTarget.currentTime)}
        onEnded={e => onEnded(e.currentTarget.currentTime)}
        onSeeked={e => onSeeked(e.currentTarget.currentTime)}
        className="w-full h-auto"
        ref={videoRef}
      >
        <source src={video} type="video/mp4"></source>
      </video>
      <audio ref={audioRef}>
        <source src={audio} type="audio/mp3"></source>
      </audio>
    </div>
  )
})

export const Video = dynamic(async () => Component)
