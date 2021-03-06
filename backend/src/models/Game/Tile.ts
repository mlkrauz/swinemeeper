import mongoose from 'mongoose'
const { Schema } = mongoose
import { TileType, validWithMines, validWithoutMines } from '../../../../frontend/src/shared/defs/models'

/**
 * A single minesweeper Tile.
 */
export interface Tile {
  hasMine: boolean
  tileType: TileType
}

/**
 * Schema for tile subdocument.
 */
export const tileSchema = new Schema<Tile>(
  {
    hasMine: {
      type: Boolean,
      required: true,
      immutable: true
    },
    tileType: {
      type: Number,
      required: true,
      enum: TileType,
      default: TileType.COVERED
    }
  },
  { _id: false } //No IDs are required, as all Tiles will be accesible in the array.
)

/**
 * Validation hook when runs on tile subdocument creation, and whenever tileType changes.
 * Verifies that the newly changed tile value is legal according to @validWithMines or
 * @validWithoutMines respectively.
 */
tileSchema.pre('save', function(): void {
  if (this.isModified('tileType') | this.isNew()) {

    // Get value of hasMine
    const hasMine: boolean = this.hasMine

    // Callback validator
    const invalidTile = (function(this: any, validTiles: readonly number[]): boolean {
      return validTiles.indexOf(this.tileType) === -1 ? true : false
    }).bind(this)
    
    // Check if tile is invalid
    const isTileInvalid = hasMine
    ? invalidTile(validWithMines)
    : invalidTile(validWithoutMines)

    if (isTileInvalid) {
      throw new Error(`Tile has ${hasMine ? 'a' : 'no'} mine, but its tileType is being set to '${this.tileType}' which is not possible!`)
    } 
  }
})
