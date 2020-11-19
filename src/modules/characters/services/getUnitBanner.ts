import { Unit } from '../../../@types/Unit'

export const getUnitBanner = (unit: Unit, outline?: boolean) =>
  `/static/common/logo${outline ? 'l_outline' : ''}/logo_${unit}.png`
