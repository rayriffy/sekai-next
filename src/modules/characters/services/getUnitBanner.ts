import { Unit } from '../../../@types/Unit'

export const getUnitBanner = (unit: Unit, outline?: boolean) =>
  `/static/common/logol${outline ? '_outline' : ''}/logo_${unit}.png`
