import { Schema, Model, Types } from 'mongoose'
import { Tile, tileSchema } from './Tile'
import { BoardSize, BoardStats } from '../../../../shared/defs'

/**
 * A row of minesweeper Tiles.
 */
export interface Row {
  tiles: Types.DocumentArray<Tile>
}

/**
 * Schema for row subdocument.
 */
export const rowSchema = new Schema<Row, Model<Row>>(
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
    const size: BoardSize = this.parent().get('boardSize')

    // Use this to
  }
})