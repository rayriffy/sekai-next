import { MCSerialData } from './MCSerialData'
import { Music } from './Music'
import { MusicVocal } from './MusicVocal'

interface TransformedSetlistBase<T = string, D = unknown> {
  type: T
  seq: number
  data: D
}

export type TransformedSetlist =
  | TransformedSetlistBase<'mc', MCSerialData[]>
  | TransformedSetlistBase<
      'music',
      {
        music: Music
        vocal: MusicVocal
      }
    >
