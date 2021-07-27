import { Skill } from '../../../@types/Skill'

export const getSkillDescription = (skill: Pick<Skill, 'description' | 'skillEffects'>, level: number) => {
  return skill.skillEffects.reduce((acc, skillEffect) => {
    return acc
      .replace(
        new RegExp(`{{${skillEffect.id};d}}`),
        String(
          skillEffect.skillEffectDetails.find(d => d.level === level)!
            .activateEffectDuration
        )
      )
      .replace(
        new RegExp(`{{${skillEffect.id};v}}`),
        String(
          skillEffect.skillEffectDetails.find(d => d.level === level)!
            .activateEffectValue
        )
      )
  }, skill.description)
}
