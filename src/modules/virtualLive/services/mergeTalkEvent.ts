import groupBy from 'lodash/groupBy'

import { CharacterTalkEvent } from '../../../@types/CharacterTalkEvent'

export const mergeTalkEvent = (characterTalkEvents: CharacterTalkEvent[]) => {
  const grouppedData = groupBy(characterTalkEvents, o => o.Serif)

  return Object.entries(grouppedData)
    .map(([key, events]) => {
      return {
        order: characterTalkEvents.findIndex(o => o.Serif === key),
        character3dIds: events.map(event => event.Character3dId),
        event: events[0],
      }
    })
    .sort((a, b) => a.order - b.order)
}
