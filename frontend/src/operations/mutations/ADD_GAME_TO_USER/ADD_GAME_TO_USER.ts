import { gql } from '@apollo/client'

export const ADD_GAME_TO_USER = gql`
  mutation addGameToUser($userId: ID!, $gameId: ID!) {
    addGameToUser(userId: $userId, gameId: $gameId) {
      user {
        _id
      }
    }
  }
`