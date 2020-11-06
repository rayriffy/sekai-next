import { Difficulty } from './Difficulty'

export interface MusicDifficulty {
  id: number
  musicId: number
  musicDifficulty: Difficulty
  playLevel: number
  releaseConditionId: number
  noteCount: number
}
