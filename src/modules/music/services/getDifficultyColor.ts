import { Difficulty } from '../../../@types/Difficulty'

export const getDifficultyActiveColor = (difficulty: Difficulty) => {
  switch (difficulty) {
    case 'easy':
      return 'text-green-700 bg-green-100 focus:text-green-800 focus:bg-green-200'
    case 'normal':
      return 'text-indigo-700 bg-indigo-100 focus:text-indigo-800 focus:bg-indigo-200'
    case 'hard':
      return 'text-yellow-700 bg-yellow-100 focus:text-yellow-800 focus:bg-yellow-200'
    case 'expert':
      return 'text-red-700 bg-red-100 focus:text-red-800 focus:bg-red-200'
    case 'master':
      return 'text-purple-700 bg-purple-100 focus:text-purple-800 focus:bg-purple-200'
  }
}

export const getDifficultyColor = (difficulty: Difficulty) => {
  switch (difficulty) {
    case 'easy':
      return 'focus:text-green-600 focus:bg-green-50'
    case 'normal':
      return 'focus:text-indigo-600 focus:bg-indigo-50'
    case 'hard':
      return 'focus:text-yellow-600 focus:bg-yellow-50'
    case 'expert':
      return 'focus:text-red-600 focus:bg-red-50'
    case 'master':
      return 'focus:text-purple-600 focus:bg-purple-50'
  }
}
