/**
 * Enum for the possible tile configurations.
 */
export enum TileType {
  UNCOVERED_0 = 0,
  UNCOVERED_1 = 1,
  UNCOVERED_2 = 2,
  UNCOVERED_3 = 3,
  UNCOVERED_4 = 4,
  UNCOVERED_5 = 5,
  UNCOVERED_6 = 6,
  UNCOVERED_7 = 7,
  UNCOVERED_8 = 8,
  COVERED = 9,
  FLAGGED = 10,
  FLAGGED_WRONG = 11,
  MINE_REVEALED = 12,
  MINE_CLICKED = 13
}

/**
 * Valid enum values when a tile contains a mine.
 */
export const validWithMines = [9, 10, 12, 13] as const

/**
 * Valid enum values when a tile does not contain a mine.
 */
export const validWithoutMines = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] as const
