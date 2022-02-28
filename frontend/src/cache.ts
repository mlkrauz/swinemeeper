import { InMemoryCache, ReactiveVar, makeVar } from '@apollo/client'
import { Themes, Theme } from './models/theme'

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        theme: {
          read () {
            return themeVar()
          }
        }
      }
    }
  }
})

export const themeVar: ReactiveVar<Theme> = makeVar<Theme>(
  // Default theme: Light - Animated
  Themes.LIGHT_ANIMATED
)
