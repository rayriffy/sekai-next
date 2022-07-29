export const getCard = (
  cardAssetbundleName: string,
  afterTraining?: boolean,
  birthday?: boolean
) =>
  `https://minio.dnaroma.eu/sekai-assets/character/member/${cardAssetbundleName}_rip/card_${
    afterTraining && !birthday ? 'after_training' : 'normal'
  }.webp`
export const getCardCutout = (
  cardAssetbundleName: string,
  afterTraining?: boolean,
  birthday?: boolean
) =>
  `https://minio.dnaroma.eu/sekai-assets/character/member_cutout_trm/${cardAssetbundleName}_rip/${
    afterTraining && !birthday ? 'after_training' : 'normal'
  }.webp`
export const getCardIcon = (
  cardAssetbundleName: string,
  afterTraining?: boolean,
  birthday?: boolean
) =>
  `https://minio.dnaroma.eu/sekai-assets/thumbnail/chara_rip/${cardAssetbundleName}_${
    afterTraining && !birthday ? 'after_training' : 'normal'
  }.webp`
