import { Schema, Model, Types } from 'mongoose'
import { Tile, tileSchema } from './Tile'

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
