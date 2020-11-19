import { FunctionComponent, memo } from 'react'

import Image from 'next/image'

import { getCharacterCutout } from '../services/getCharacterCutout'
import { getNameLabelHorizontal } from '../services/getNameLabel'
import { SectionLarge, SectionSmall } from './section'

import { CharacterProfile } from '../../../@types/CharacterProfile'
import { GameCharacter } from '../../../@types/GameCharacter'
import { GameCharacterUnit } from '../../../@types/GameCharacterUnit'

interface Props {
  character: GameCharacter
  profile: CharacterProfile
  characterUnit: GameCharacterUnit
}

export const OverviewCard: FunctionComponent<Props> = memo(props => {
  const { character, profile, characterUnit } = props

  return (
    <div className="relative">
      <div
        className="absolute top-0 bottom-0 left-0 right-0 rounded-lg z-hide transform -rotate-1 scale-102"
        style={{ backgroundColor: characterUnit.colorCode }}
      ></div>
      <div className="block sm:flex bg-white rounded-lg overflow-hidden shadow">
        <div className="sm:p-0 aspect-w-3 aspect-h-3 sm:aspect-h-4 w-full sm:w-2/5 relative">
          <Image
            className="transform scale-102 sm:scale-150 -mt-0 sm:-mt-10 xl:-mt-16 object-cover"
            src={getCharacterCutout(character.id)}
            layout="fill"
          />
        </div>
        <div className="w-full grid grid-cols-1 lg:grid-cols-5 gap-4 p-4">
          <div className="col-span-3 space-y-2">
            <SectionSmall title="CV" content={profile.characterVoice} />
            <SectionSmall title="School" content={profile.school} />
            <SectionSmall title="Class" content={profile.schoolYear} />
            <SectionLarge title="Hobby" content={profile.hobby} />
            <SectionLarge
              title="Special Skill"
              content={profile.specialSkill}
            />
            <SectionLarge
              title="Favorite Food"
              content={profile.favoriteFood}
            />
            <SectionLarge title="Hated Food" content={profile.hatedFood} />
            <div className="flex border-b-4 border-dotted border-teal-400 lg:border-none pb-6 lg:pb-0">
              <span className="px-4 py-1 rounded-full bg-teal-400 text-white text-lg mr-2">
                Weakness
              </span>
              <p className="text-lg pl-2">{profile.weak}</p>
            </div>
          </div>
          <div className="col-span-2 space-y-2">
            <SectionSmall title="Birthday" content={profile.birthday} />
            <SectionSmall title="Height" content={profile.height} />
          </div>
        </div>
      </div>
    </div>
  )
})
