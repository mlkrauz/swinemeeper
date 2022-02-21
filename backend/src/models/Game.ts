import { Schema, model } from 'mongoose'
import { GameState } from '../../../shared/defs/models'
import { BoardSize } from '../../../shared/defs'

// Quick and dirty 'dont-repeat-yourself' hack
const numberDefault0 = {
  type: Number,
  default: 0
} as const

const gameSchema = new Schema(
  {
    player: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    gameState: {
      type: String,
      enum: GameState,
      default: GameState.INPROGRESS
    },
    boardSize: {
      type: String,
      enum: BoardSize,
      default: BoardSize.BEGINNER
    },
    mineLocations: Buffer,
    boardData: Buffer,
    timeElapsed: numberDefault0,
    playerMoves: numberDefault0,
    uncoveredTiles: numberDefault0,
    flaggedTiles: numberDefault0,
    reactions: [{
      type: Schema.Types.ObjectId,
      ref: 'Reaction'
    }]
  }, 
  { timestamps: true }
)

export const Game = model('Game', gameSchema)
