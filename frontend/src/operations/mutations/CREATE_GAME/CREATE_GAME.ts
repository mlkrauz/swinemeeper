import { gql } from '@apollo/client'

export const CREATE_GAME = gql`
  mutation createGame($player: ID!, boardSize: BoardSize!, rows: [inputRow!]!) {
    createGame(player: $player, boardSize: $boardSize, rows: $rows) {
      game {
        _id
      }
    }
  }
`