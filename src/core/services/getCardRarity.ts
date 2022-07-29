import { Card } from '../../@types/Card'

export interface ProcessedCardRarityType {
  level: number
  birthday?: boolean
}

export const getCardRarity = ({
  cardRarityType,
}: Pick<Card, 'cardRarityType'>): ProcessedCardRarityType => {
  switch (cardRarityType) {
    case 'rarity_1':
      return {
        level: 1,
      }
    case 'rarity_2':
      return {
        level: 2,
      }
    case 'rarity_3':
      return {
        level: 3,
      }
    case 'rarity_4':
      return {
        level: 4,
      }
    case 'rarity_birthday':
      return {
        level: 4,
        birthday: true,
      }
  }
}
