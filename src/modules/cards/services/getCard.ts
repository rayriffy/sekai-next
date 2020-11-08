export const getCard = (cardAssetbundleName: string, afterTraining?: boolean) =>
  `https://sekai-res.dnaroma.eu/file/sekai-assets/character/member/${cardAssetbundleName}_rip/card_${
    afterTraining ? 'after_training' : 'normal'
  }.webp`
export const getCardCutout = (
  cardAssetbundleName: string,
  afterTraining?: boolean
) =>
  `https://sekai-res.dnaroma.eu/file/sekai-assets/character/member_cutout_trm/${cardAssetbundleName}_rip/${
    afterTraining ? 'after_training' : 'normal'
  }.webp`
export const getCardIcon = (
  cardAssetbundleName: string,
  afterTraining?: boolean
) =>
  `https://sekai-res.dnaroma.eu/file/sekai-assets/thumbnail/chara_rip/${cardAssetbundleName}_${
    afterTraining ? 'after_training' : 'normal'
  }.webp`
