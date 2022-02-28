export enum ThemeColor {
  LIGHT='LIGHT',
  DARK='DARK',
  PASTEL='PASTEL'
}

export type Theme = {
  id: string
  displayName: string
  color: ThemeColor
  displayAnimations: boolean
}

export const Themes: { [theme: string]: Theme } = {
  LIGHT_NOT_ANIMATED: {
    id: 'LIGHT_NOT_ANIMATED',
    displayName: 'Light - Simple',
    color: ThemeColor.LIGHT,
    displayAnimations: false
  },
  LIGHT_ANIMATED: {
    id: 'LIGHT_ANIMATED',
    displayName: 'Light - Dynamic',
    color: ThemeColor.LIGHT,
    displayAnimations: true
  },
  DARK_NOT_ANIMATED: {
    id: 'DARK_NOT_ANIMATED',
    displayName: 'Dark - Simple',
    color: ThemeColor.DARK,
    displayAnimations: false
  },
  DARK_ANIMATED: {
    id: 'DARK_ANIMATED',
    displayName: 'Dark - Dynamic',
    color: ThemeColor.DARK,
    displayAnimations: true
  },
  PASTEL_NOT_ANIMATED: {
    id: 'PASTEL_NOT_ANIMATED',
    displayName: 'Pastel - Simple',
    color: ThemeColor.PASTEL,
    displayAnimations: false
  },
  PASTEL_ANIMATED: {
    id: 'PASTEL_ANIMATED',
    displayName: 'Pastel - Dynamic',
    color: ThemeColor.PASTEL,
    displayAnimations: true
  },
}
