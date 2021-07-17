  import { MusicCategory } from "../../src/@types/MusicCategory"

export const getMusicVideo = (
  musicId: number,
  musicCategories: MusicCategory,
  trimmed?: boolean
) => {
  const mode =
    musicCategories === 'original'
      ? 'original_mv'
      : musicCategories === 'mv_2d'
      ? 'sekai_mv'
      : ''
  const paddedMusicId = String(musicId).padStart(4, '0')

  const fileNameSpecialCases = [
    [144, 'ainomaterial'],
    [143, 'traffic_jam'],
    [149, 'kanadetomosusora'],
    [156, 'beateater'],
  ]
  const fileName = fileNameSpecialCases.find(o => o[0] === musicId) !== undefined ? fileNameSpecialCases.find(o => o[0] === musicId)[1] : paddedMusicId

  return trimmed
    ? `live/2dmode/${mode}/${paddedMusicId}_rip/${paddedMusicId}.mp4`
    : `https://sekai-res.dnaroma.eu/file/sekai-assets/live/2dmode/${mode}/${paddedMusicId}_rip/${fileName}.mp4`
}

