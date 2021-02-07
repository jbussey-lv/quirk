export default class Placement {
  constructor(row, col, tile){
    this.row = row;
    this.col = col;
    this.tile = tile;
  }

  hasCoords(row, tile){
    return this.row == row && this.col == this.col;
  }
}