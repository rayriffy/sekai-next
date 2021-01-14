import { FunctionComponent, memo, createContext, Fragment } from 'react'

import Image from 'next/image'

import { getCharacterCutout } from '../services/getCharacterCutout'
import { SectionLarge, SectionSmall, SectionSpecial } from './section'

import { CharacterProfile } from '../../../@types/CharacterProfile'
import { GameCharacter } from '../../../@types/GameCharacter'
import { GameCharacterUnit } from '../../../@types/GameCharacterUnit'

interface Props {
  character: GameCharacter
  profile: CharacterProfile
  characterUnit: GameCharacterUnit
}

export const CharacterColorCode = createContext<string>('rgba(45, 212, 191')

export const OverviewCard: FunctionComponent<Props> = memo(props => {
  const { character, profile, characterUnit } = props

  return (
    <CharacterColorCode.Provider value={characterUnit.colorCode}>
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
            <div
              className={`space-y-2 ${
                profile.school !== undefined ? 'col-span-3' : 'col-span-2'
              }`}
            >
              {profile.school !== undefined ? (
                <Fragment>
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
                  <SectionLarge
                    title="Hated Food"
                    content={profile.hatedFood}
                  />
                  <SectionSpecial title="Weakness" content={profile.weak} />
                </Fragment>
              ) : null}
            </div>
            <div
              className={`${
                profile.school !== undefined ? 'col-span-2' : 'col-span-3'
              } space-y-2`}
            >
              <SectionSmall title="Birthday" content={profile.birthday} />
              <SectionSmall title="Height" content={profile.height} />
              <div>
                <div className="bg-gray-50 text-gray-900 p-4 rounded-lg mt-4 pb-16">
                  {profile.introduction}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CharacterColorCode.Provider>
  )
})
