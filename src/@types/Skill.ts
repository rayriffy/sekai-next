import { JudgementType } from './JudgementType'

export type ActivateEffectValueType = 'rate' | 'fixed'
export type EffectType = 'score_up' | 'judgment_up' | 'life_recovery'

export interface Skill {
  id: number
  shortDescription: string
  description: string
  descriptionSpriteName: EffectType
  skillEffects: {
    id: 1
    skillEffectType: EffectType
    activateNotesJudgmentType: JudgementType
    skillEffectDetails: {
      id: number
      level: number
      activateEffectDuration: number
      activateEffectValueType: string
      activateEffectValue: number
    }[]
  }[]
}
