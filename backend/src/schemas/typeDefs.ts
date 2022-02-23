import { gql } from 'apollo-server-express'

export const typeDefs = gql`

  # # # # # # # # # # # # # # #
  # ENUMS
  # # # # # # # # # # # # # # #
  enum TileType {
    UNCOVERED_0
    UNCOVERED_1
    UNCOVERED_2
    UNCOVERED_3
    UNCOVERED_4
    UNCOVERED_5
    UNCOVERED_6
    UNCOVERED_7
    UNCOVERED_8
    COVERED
    FLAGGED
    FLAGGED_WRONG
    MINE_REVEALED
    MINE_CLICKED
  }

  enum GameState {
    INPROGRESS
    PAUSED
    WIN
    LOSS
    ABANDONED
  }

  enum BoardSize {
    BEGINNER
    INTERMEDIATE
    EXPERT
  }

  # # # # # # # # # # # # # # #
  # TYPES
  # # # # # # # # # # # # # # #
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    games: [Game]
    reactions: [Reaction]
    friends: [User]
  }

  type Game {
    _id: ID!
    player: User!
    gameState:
  }

  
`
