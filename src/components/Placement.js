class Placement {
  constructor(row, col, tile){
    this.row = row;
    this.col = col;
    this.tile = tile;
  }

  overlaps(placement){
    return this.row === placement.row &&
           this.col === placement.col;
  }
}

module.exports = Placement;