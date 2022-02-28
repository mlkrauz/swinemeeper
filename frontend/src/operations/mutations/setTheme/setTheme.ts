import { Themes, Theme } from '../../../models/theme'
import { ReactiveVar } from '@apollo/client'
import { isEqual } from 'lodash-es'

export const setTheme = (themeVar: ReactiveVar<Theme>) => {
  // Check if theme exists in our list of themes.
  const validTheme = (themeToValidate: Theme): boolean => {
    const validIndex: number = Object.values(Themes).findIndex(
      (currentTheme) => isEqual(currentTheme, themeToValidate)
    )

    return validIndex !== -1 ? true : false
  }
  
  return (newTheme: Theme): void => {
    // Only set the theme if it is valid. Do nothing otherwise.
    if (validTheme(newTheme)) { 
      themeVar(newTheme)
    }
  }
}
