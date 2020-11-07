import {
  FunctionComponent,
  ReactEventHandler,
  memo,
  useCallback,
  useEffect,
  useState,
  useRef,
  Fragment,
} from 'react'

import dynamic from 'next/dynamic'

interface Props {
  audio: string
  video: string
}

const Component: FunctionComponent<Props> = memo(props => {
  const { audio, video } = props

  const audioRef = useRef<HTMLAudioElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const [playable, setPlayable] = useState<boolean>(false)

  // reset timecode if vocals (audio) or mv updated
  useEffect(() => {
    setPlayable(false)

    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      audioRef.current.addEventListener('canplay', () => setPlayable(true))
      audioRef.current.addEventListener('loadstart', () => setPlayable(false))
    }

    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }, [audio, video])

  // match audio timecode with video
  const syncAudioTimecode = (currentTime: number) => {
    audioRef.current!.currentTime = currentTime
  }

  const onPlay = useCallback<ReactEventHandler<HTMLVideoElement>>(
    ({ currentTarget: { currentTime } }) => {
      syncAudioTimecode(currentTime)
      // play audio
      audioRef.current?.play()
    },
    []
  )

  const onPause = useCallback<ReactEventHandler<HTMLVideoElement>>(
    ({ currentTarget: { currentTime } }) => {
      syncAudioTimecode(currentTime)
      // pause audio
      audioRef.current?.pause()
    },
    []
  )

  const onEnded = useCallback<ReactEventHandler<HTMLVideoElement>>(
    ({ currentTarget: { currentTime } }) => {
      syncAudioTimecode(currentTime)
      // pause audio
      audioRef.current?.pause()
    },
    []
  )

  const onSeeked = useCallback<ReactEventHandler<HTMLVideoElement>>(
    ({ currentTarget: { currentTime } }) => {
      syncAudioTimecode(currentTime)
    },
    []
  )

  return (
    <div>
      <video
        src={video}
        controls={playable}
        onPlay={onPlay}
        onPause={onPause}
        onEnded={onEnded}
        onSeeked={onSeeked}
        className="w-full h-auto"
        ref={videoRef}
      ></video>
      <audio src={audio} ref={audioRef}></audio>
    </div>
  )
})

export const Video = dynamic(async () => Component)
