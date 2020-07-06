const { values } = require("lodash");

class Board {

  static GRID_WIDTH = 200;
  static GRID_HEIGHT = 200;
  moves = [];

  isSpaceTaken(row, col){

    if(this._isSpaceOutOfBounds(row, col)){
      throw new Error('That space is outside the bounds of the grid');
    }

    return this.getGrid()[row][col] !== null;
  }

  addMove(move){
    this.moves.push(move);
  }

  getGrid(){
    var grid = this._getEmptyGrid();

    this._getPlacements().forEach(placement => {
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
    this._getPlacements().forEach(placement => {
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

  isIllegal(){
    return this._hasIllegalSequences() ||
           this._hasDisjointRegions();
  }

  _hasIllegalSequences(){
    return this.getSequences().reduce((acc, sequence) => {
      return acc || sequence.isIllegal();
    }, false);
  }
  
  _hasDisjointRegions(){
    return this.getRegions.length > 1;
  }

  _getRegions(){
    return 1;
  }

  _getSequences(){
    return [];
  }

  _getUniquePlacementVals(prop){
    var fullVals = this.placements.map((placement)=>{
      placement[prop];
    });
    return new Set(fullVals);
  }

  _getUniqueTileVals(prop){
    var fullVals = this.placements.map((placement)=>{
      placement.tile[prop];
    });
    return new Set(fullVals);
  }


  _hasNoPattern(){
    var uniqueColors = this._getUniquePlacementVals('color');
    var uniqueShapes = this._getUniquePlacementVals('shape');

    return uniqueColors.size > 1 &&
           uniqueShapes.size > 1;
  }

  _totalMissmatchesTouching(){
    var grid = this.getGrid();
    var displacements = [{row: 0, col: 1}, {row: 1, col: 0}, {row: 1, col: 1}];
    var primeCell, adjacentCell;

    for(row = 0; row < Board.GRID_HEIGHT-1; row++){
      for(col = 0; col < Board.GRID_WIDTH-1; col++){
        // if this cell is blank... go to next
        if(!(primeCell = grid[row, col])){continue;}

        for(displacement in displacements){

          // if adjacent cell blank... go to next
          if(!(adjacentCell = grid[row + displacement.row, col + displacement.col])){continue;}

          // if colors AND shapes mismatch, this is a violation
          if(adjacentCell.color !== primeCell.color && adjacentCell.color !== primeCell.color){
            return true;
          }
        }
      }
    }
    return false;
  }

  _isSpaceOutOfBounds(row, col){
    return row < 0 ||
           row >= Board.GRID_HEIGHT ||
           col < 0 ||
           col >= Board.GRID_WIDTH;
  }

  _getPlacements(){
    var placements = new Array();

    this.moves.forEach(move => {
      move.placements.forEach(placement => {
        placements.push(placement);
      });
    });

    return placements;
  }

  _getEmptyGrid(){

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

module.exports = Board;