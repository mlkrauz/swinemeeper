import { Schema, model } from 'mongoose'
import { GameState } from '../../../shared/defs/models'
import { BoardSize } from '../../../shared/defs'
import { TileType } from '../../../shared/defs/models'

// Quick and dirty 'dont-repeat-yourself' hack
const numberDefault0 = {
  type: Number,
  default: 0
} as const

/* We must define a subdocument schema for the row & tile data.
  Every game will have a board with tile data, but no tile data will exist
  outside of a game. Thus, it is defined here.
  A big note to myself! Sub-document schemas are never saved on
  their own, only when the parent schema is saved.
*/
const tileSchema = new Schema({
  hasMine: {
    type: Boolean,
    immutable: true
  },
  tileType: {
    type: Number,
    enum: TileType,
    default: TileType.COVERED
  }
}, { _id: false }) //No IDs are required, as all Tiles will be accesible in the array.

const rowSchema = new Schema({
  tiles: [{
    type: tileSchema,
    default: () => ({})
  }]
}, { _id: false })

const gameSchema = new Schema(
  {
    player: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      immutable: true
    },
    gameState: {
      type: String,
      enum: GameState,
      default: GameState.INPROGRESS
    },
    boardSize: {
      type: String,
      enum: BoardSize,
      default: BoardSize.BEGINNER,
      immutable: true
    },
    rows: [{
      type: rowSchema,
      default: () => ({})
    }],
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
