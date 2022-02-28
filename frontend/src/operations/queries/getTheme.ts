import { gql } from '@apollo/client'

export const GET_THEME = gql`
  query GetTheme {
    theme @client {
      id
      displayName
      color
      displayAnimations
    }
  }
`