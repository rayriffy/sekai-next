import { MusicTag } from '../../../@types/MusicTag'
import { Unit } from '../../../@types/Unit'
import { UnitProfile } from '../../../@types/UnitProfile'

// tag vocaloid is unit piapro

export const getTargetUnitProfile = (
  tags: MusicTag[],
  unitProfiles: UnitProfile[]
): UnitProfile[] => {
  const allUnitTags = tags.map(tag =>
    tag.musicTag === 'vocaloid' ? 'piapro' : tag.musicTag
  ) as Unit[]
  const filteredUnitProfiles = unitProfiles.filter(unitProfile =>
    allUnitTags.includes(unitProfile.unit)
  )

  return filteredUnitProfiles
}
