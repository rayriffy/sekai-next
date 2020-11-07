import { Fragment, FunctionComponent } from 'react'

import { Music } from '../../../@types/Music'
import { MusicDifficulty } from '../../../@types/MusicDifficulty'
import { MusicTag } from '../../../@types/MusicTag'
import { MusicVocal } from '../../../@types/MusicVocal'

interface Props {
  music: Music
  difficulties: MusicDifficulty[]
  tags: MusicTag[]
  vocals: MusicVocal[]
}

export const MusicDetail: FunctionComponent<Props> = props => {
  const { music, difficulties, tags, vocals } = props

  return <Fragment>OK</Fragment>
}
