import { gql } from '@apollo/client'

export const UPDATE_GAME = gql`
  mutation updateGame(
    $gameId: ID!
    $gameState: GameState
    $tilesToUpdate: [tileUpdate!]
    $timeElapsed: Int
    $playerMoves: Int
    $uncoveredTiles: Int
    $flaggedTiles: Int
  ) {
    updateGame(
      gameId: $gameId
      gameState: $gameState
      tilesToUpdate: $tilesToUpdate
      timeElapsed: $timeElapsed
      playerMoves: $playerMoves
      uncoveredTiles: $uncoveredTiles
      flaggedTiles: $flaggedTiles
    ) {
      game {
        _id
      }
    }
  }
`