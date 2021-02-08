export default class Placement {
  constructor(row, col, tile){
    this.row = row;
    this.col = col;
    this.tile = tile;
  }

  hasCoords(row, col){
    return this.row === row && this.col === col;
  }

  matches(placement){
    return this.hasCoords(placement.row, placement.col);
  }
}