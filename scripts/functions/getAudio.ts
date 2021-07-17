export const getAudioShort = (
  musicVocalAssetbundleName: string,
  trimmed?: boolean
) =>
  trimmed
    ? `music/short/${musicVocalAssetbundleName}_rip/${musicVocalAssetbundleName}_short.mp3`
    : `https://sekai-res.dnaroma.eu/file/sekai-assets/music/short/${musicVocalAssetbundleName}_rip/${musicVocalAssetbundleName}_short.mp3`
export const getAudioFull = (
  musicVocalAssetbundleName: string,
  trimmed?: boolean
) =>
  trimmed
    ? `music/long/${musicVocalAssetbundleName}_rip/${musicVocalAssetbundleName}.mp3`
    : `https://sekai-res.dnaroma.eu/file/sekai-assets/music/long/${musicVocalAssetbundleName}_rip/${musicVocalAssetbundleName}.mp3`
