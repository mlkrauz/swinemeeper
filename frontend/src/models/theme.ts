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
    id: 'light_not_animated',
    displayName: 'Light - Simple',
    color: ThemeColor.LIGHT,
    displayAnimations: false
  },
  LIGHT_ANIMATED: {
    id: 'light_animated',
    displayName: 'Light - Dynamic',
    color: ThemeColor.LIGHT,
    displayAnimations: true
  },
  DARK_NOT_ANIMATED: {
    id: 'dark_not_animated',
    displayName: 'Dark - Simple',
    color: ThemeColor.DARK,
    displayAnimations: false
  },
  DARK_ANIMATED: {
    id: 'dark_animated',
    displayName: 'Dark - Dynamic',
    color: ThemeColor.DARK,
    displayAnimations: true
  },
  PASTEL_NOT_ANIMATED: {
    id: 'pastel_not_animated',
    displayName: 'Pastel - Simple',
    color: ThemeColor.PASTEL,
    displayAnimations: false
  },
  PASTEL_ANIMATED: {
    id: 'pastel_animated',
    displayName: 'Pastel - Dynamic',
    color: ThemeColor.PASTEL,
    displayAnimations: true
  },
}
