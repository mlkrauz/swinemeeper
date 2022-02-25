import { gql } from 'apollo-server-express'

export const typeDefs = gql`

  # # # # # # # # # # # # # # #
  #   ENUMS
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

  enum Reactions {
    THUMBSUP
    CLAPPING
    RAISING_HANDS
    EYES
    PARTY_POPPER
    TROPHY
    ZANY_FACE
    PLEADING_FACE
    FLUSHED_FACE
    HEART_EYES
    SMILING_IMP
    COLD_FACE
    EXPLODING_HEAD
    EGGPLANT
    HOT_PEPPER
    ELEVEN_THIRTY
    B_BUTTON
    P_BUTTON
  }

  # # # # # # # # # # # # # # #
  #   SCALARS
  # # # # # # # # # # # # # # #

  scalar Date 

  # # # # # # # # # # # # # # #
  #   TYPES
  # # # # # # # # # # # # # # #

  type Auth {
    token: ID!
    user: User!
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    games: [Game!]!
    reactions: [Reaction!]!
    friends: [User!]!
    createdAt: Date!
    modifiedAt: Date!
  }

  type Game {
    _id: ID!
    player: User!
    gameState: GameState!
    boardSize: BoardSize!
    rows: [Row!]!
    timeElapsed: Int!
    playerMoves: Int!
    uncoveredTiles: Int!
    flaggedTiles: Int!
    reactions: [Reactions!]!
    createdAt: Date!
    modifiedAt: Date!
  }

  type Row {
    tiles: [Tile!]!
  }

  type Tile {
    hasMine: Boolean!
    tileType: TileType # This has to be 'undefined'-able for default to kick in, since it is a subdocument
  }

  type Reaction {
    reaction: Reactions!
    reactingToGame: Game!
    reactingUsers: [User!]!
  }

  # # # # # # # # # # # # # # #
  #   INPUTS
  # # # # # # # # # # # # # # #

  input tileUpdate {
    rowNum: Int!
    tileNum: Int!
    tileType: TileType!
  }

  input inputRow {
    tiles: [inputTile!]!
  }

  input inputTile {
    hasMine: Boolean!
    tileType: TileType
  }

  # # # # # # # # # # # # # # #
  #   QUERIES
  # # # # # # # # # # # # # # #

  type Query {
    user(id: ID!): User
    users(ids: [ID!]!): [User]!
    allUsers: [User!]!

    game(id: ID!): Game
    games(ids: [ID!]!): [Game]!
    allGames: [Game!]!
    
    reaction(id: ID!): Reaction
    reactions(ids: [ID!]!): [Reaction]!
  }

  # # # # # # # # # # # # # # #
  #   MUTATIONS
  # # # # # # # # # # # # # # #

  type Mutation {
    # Auth mutations
    createUser(
      username: String!
      email: String!
      password: String!
    ): Auth
    login(email: String!, password: String!): Auth

    # User mutations
    addGameToUser(userId: ID!, gameId: ID!): User!
    # addReactionToUser(userId: ID!, reactionId: ID!): User!
    # removeReactionFromUser(userId: ID!, reactionId: ID!): User!
    # addFriendToUser(userId: ID!, friendId: ID!): User!
    # removeFriendFromUser(userId: ID!, friendId: ID!): User!

    # Game mutations
    createGame(
      player: ID!
      boardSize: BoardSize!
      rows: [inputRow!]!
    ): Game
    updateGame(
      gameId: ID!
      gameState: GameState,
      tilesToUpdate: [tileUpdate!]
      timeElapsed: Int
      playerMoves: Int
      uncoveredTiles: Int
      flaggedTiles: Int
    ): Game!
    # addReactionToGame(gameId: ID!, reactionId: ID!): Game!
    # removeReactionFromGame(gameId: ID!, reactionId: ID!): Game!
  }
`
