import { Schema, model, Types } from 'mongoose'
import { GameState } from '../../../../shared/defs/models'
import { BoardSize } from '../../../../shared/defs'
import { Row, rowSchema } from './Row'

/**
 * A single Game.
 */
export interface Game {
  _id: Types.ObjectId
  player: Schema.Types.ObjectId
  gameState: GameState
  boardSize: BoardSize
  rows: Types.DocumentArray<Row>
  timeElapsed: number
  playerMoves: number
  uncoveredTiles: number
  flaggedTiles: number
  reactions: Types.Array<Schema.Types.ObjectId>
  createdAt: Date
  updatedAt: Date
}

// Quick and dirty 'dont-repeat-yourself' hack
const numberDefault0 = {
  type: Number,
  required: true,
  default: 0
}

/**
 * Schema for a game document.
 */
const gameSchema = new Schema<Game>(
  {
    player: {
      type: Types.ObjectId,
      required: true,
      ref: 'User',
      immutable: true
    },
    gameState: {
      type: String,
      required: true,
      enum: GameState,
      default: GameState.INPROGRESS
    },
    boardSize: {
      type: String,
      required: true,
      enum: BoardSize,
      default: BoardSize.BEGINNER,
      immutable: true
    },
    rows: [{
      type: rowSchema,
      required: true,
      default: () => ({})
    }],
    timeElapsed: numberDefault0,
    playerMoves: numberDefault0,
    uncoveredTiles: numberDefault0,
    flaggedTiles: numberDefault0,
    reactions: [{
      type: Types.ObjectId,
      required: true,
      ref: 'Reaction'
    }]
  }, 
  { timestamps: true }
)

/**
 * Document model for a Game.
 */
export const GameModel = model<Game>('Game', gameSchema)
