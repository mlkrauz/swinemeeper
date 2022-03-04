import mongoose from 'mongoose'
const { Schema, Model, Types } = mongoose
import { Tile, tileSchema } from './Tile'
import { BoardSize, BoardStats } from '../../../../frontend/src/shared/defs'

/**
 * A row of minesweeper Tiles.
 */
export interface Row {
  tiles: mongoose.Types.DocumentArray<Tile>
}

/**
 * Schema for row subdocument.
 */
export const rowSchema = new Schema<Row, mongoose.Model<Row>>(
  {
    tiles: [{
      type: tileSchema,
      required: true,
      default: () => ({})
    }]
  }, 
  { _id: false }
)

/**
 * The quanitity of tiles should be static after creation, as board size cannot change.
 * Here we check that 
 */
rowSchema.pre('save', function(): void {
  if (this.isModified('tiles') | this.isNew()) {
    
    // Get the parent game's board size.
    const sizeEnumValue: BoardSize = this.parent().get('boardSize')

    // Get array length.
    const size: number = this.tiles.length()

    switch (sizeEnumValue) {
      case BoardSize.BEGINNER:
        if (size !== BoardStats.BEGINNER.x) {
          throw new Error(`Row should have a length of ${BoardStats.BEGINNER.x} to match the board size!`)
        }
        break
      case BoardSize.INTERMEDIATE:
        if (size !== BoardStats.INTERMEDIATE.x) {
          throw new Error(`Row should have a length of ${BoardStats.INTERMEDIATE.x} to match the board size!`)
        }
        break
      case BoardSize.EXPERT:
        if (size !== BoardStats.EXPERT.x) {
          throw new Error(`Row should have a length of ${BoardStats.EXPERT.x} to match the board size!`)
        }
        break
      default:
        throw new Error('Unexpected BoardSize value. Did the available board size selection grow?')
    }
  }
})