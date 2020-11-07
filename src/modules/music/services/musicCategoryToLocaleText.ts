import { MusicCategory } from '../../../@types/MusicCategory'

export const musicCategoryToLocaleText = (category: MusicCategory) => {
  switch (category) {
    case 'original':
      return 'Original MV'
    case 'mv_2d':
      return '2D MV'
    default:
      return category
  }
}
