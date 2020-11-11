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
      <div className="grid grid-cols-1 md:grid-cols-5 bg-white rounded-lg overflow-hidden shadow">
        <div className="col-span-3 lg:col-span-2 overflow-hidden relative flex items-end">
          <div className="absolute w-1/3 bottom-0 left-0 mb-4 ml-4 z-20">
            <Image
              className=""
              src={getNameLabelHorizontal(character.id)}
              unsized
            />
          </div>
          <Image
            className="transform scale-102 sm:scale-150 -mt-0 sm:-mt-10 xl:-mt-16"
            src={getCharacterCutout(character.id)}
            width={1512}
            height={1024}
          />
        </div>
        <div className="col-span-2 lg:col-span-3 grid grid-cols-1 lg:grid-cols-5 gap-4 p-4">
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
            <div className="flex">
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
