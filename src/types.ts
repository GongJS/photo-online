export type SizeKey = 'one' | 'two' | 'id' | 'passport'
export type ColorKey = 'white' | 'blue' | 'red'

export interface SizeConfig {
  label: string
  w: number
  h: number
  mm: string
}

export interface ColorConfig {
  label: string
  value: string
}

export type StatusState = 'loading' | 'done' | 'error'

export const SIZES: Record<SizeKey, SizeConfig> = {
  one:      { label: '一寸',   w: 295, h: 413, mm: '25×35mm' },
  two:      { label: '二寸',   w: 413, h: 579, mm: '35×49mm' },
  id:       { label: '身份证', w: 358, h: 441, mm: '26×32mm' },
  passport: { label: '护照',   w: 390, h: 567, mm: '33×48mm' },
}

export const BG_COLORS: Record<ColorKey, ColorConfig> = {
  white: { label: '白底', value: '#ffffff' },
  blue:  { label: '蓝底', value: '#438edb' },
  red:   { label: '红底', value: '#c8292a' },
}
