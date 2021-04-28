import { moveSyntheticComments, resolveProjectReferencePath } from "typescript";
import { TileInterface } from "../features/tile/Tile";
import { MoveInterface } from "../slices/gameSlice";
import Grid from "./Grid";
import Line from "./Line";

export default class Board {

  static readonly rowCount = 12;
  static readonly colCount = 12;
  _moves: MoveInterface[];
  _grid: Grid;

  constructor(moves: MoveInterface[]) {
    this._moves = moves;
    this._grid = this._movesToGrid(moves);
  }

  isCurrentMoveIllegal(): boolean {
    let move = this._getCurrentMove()
    return true;
  }

  getCurrentMovePoints(move: MoveInterface): number {
    return this._getLinesOverlappingMove(move)
               .reduce((total, line) => total + line.getPoints(), 0);
  }

  _getCurrentMove(): MoveInterface{
    return this._moves[this._moves.length - 1];
  }

  _getLinesOverlappingMove(move: MoveInterface): Line[] {
    return [new Line([])];
  }

  

  _movesToGrid(moves: MoveInterface[]): Grid {
    let grid = new Grid(30, 20);
    moves.forEach(move => {
      move.placements.forEach(placement => {
        grid.addPlacement(placement);
      });
    });
    return grid;
  }


}