class Board {

  static GRID_WIDTH = 200;
  static GRID_HEIGHT = 200;
  moves = [];

  isSpaceEmpty(row, col){
    var grid = getGrid();

    return grid[row, col] == null;
  }

  isMoveLegal(move){
    return true;
  }

  addMove(move){
    this.moves.push(move);
  }

  getGrid(){
    var grid = this.getEmptyGrid();

    this.getPlacements().forEach(placement => {
      grid[placement.row][placement.col] = placement.tile;
    });

    return grid;
  }

  getDisplayBounds(){

    // set a starting tile in the middle
    var top    = Math.floor(Board.GRID_HEIGHT / 2);
    var bottom = Math.floor(Board.GRID_HEIGHT / 2);
    var left   = Math.floor(Board.GRID_WIDTH / 2);
    var right  = Math.floor(Board.GRID_WIDTH / 2);

    // push outwards for each existing placement
    this.getPlacements().forEach(placement => {
      top    = Math.min(top, placement.row);
      bottom = Math.max(bottom, placement.row);
      left   = Math.min(left, placement.col);
      right  = Math.max(right, placement.col);
    });

    // return with a margin big enough for any new move
    return [
      top - Tile.getMaxLineLength(),
      bottom + Tile.getMaxLineLength(),
      left - Tile.getMaxLineLength(),
      right + Tile.getMaxLineLength(),
    ]
  }

  getPlacements(){
    var placements = new Array();

    this.moves.forEach(move => {
      move.placements.forEach(placement => {
        placements.push(placement);
      });
    });

    return placements;
  }

  getEmptyGrid(){

    var emptyGrid = new Array();

    for(let row = 0; row < Board.GRID_WIDTH; row++){
      var emptyRow = new Array();
      for(let col = 0; col < Board.GRID_HEIGHT; col++){
        emptyRow[col] = null;
      }
      emptyGrid[row] = emptyRow;
    }

    return emptyGrid;
  }
}

