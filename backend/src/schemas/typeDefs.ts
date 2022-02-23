import { gql } from 'apollo-server-express'

export const typeDefs = gql`
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
