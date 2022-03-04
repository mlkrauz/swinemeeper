import mongoose from 'mongoose'
const { Schema, model, Types } = mongoose
import { GameState, TileType } from '../../../../frontend/src/shared/defs/models'
import { BoardSize } from '../../../../frontend/src/shared/defs'
import { Row, rowSchema } from './Row'

/**
 * A single Game.
 */
export interface Game {
  _id: mongoose.Types.ObjectId
  player: mongoose.Schema.Types.ObjectId
  gameState: GameState
  boardSize: BoardSize
  rows: mongoose.Types.DocumentArray<Row>
  timeElapsed: number
  playerMoves: number
  uncoveredTiles: number
  flaggedTiles: number
  reactions: mongoose.Types.Array<mongoose.Schema.Types.ObjectId>
  createdAt: Date
  updatedAt: Date
}

/**
 * Interface definition for updating a tile.
 */
export interface TileUpdate {
  rowNum: number
  tileNum: number
  tileType: TileType
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
      ref: 'Reaction'
    }]
  }, 
  { timestamps: true }
)

/**
 * Document model for a Game.
 */
export const GameModel = model<Game>('Game', gameSchema)
