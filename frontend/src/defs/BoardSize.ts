/**
 * Enum handling the board size.
 */
export enum BoardSize {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  EXPERT = 'EXPERT'
}

/**
 * Typescript enums may only be string or numeric based. I want to create a 'nested enum' with all of the proprties
 * of each board size. From some quick research, the best way to achieve this is with a class w/ a private constructor,
 * and staticly declared properties.
 */
export class BoardStats {
  static readonly BEGINNER = new BoardStats('BEGINNER', 9, 9, 10);
  static readonly INTERMEDIATE = new BoardStats('INTERMEDIATE', 16, 16, 40);
  static readonly EXPERT = new BoardStats('EXPERT', 16, 30, 99);

  private constructor(
    private readonly key: string,
    public readonly x: number,
    public readonly y: number,
    public readonly mines: number
  ) {}

  toString():string {
    return this.key;
  }

  density():number {
    return this.x * this.y / this.mines
  }
}
