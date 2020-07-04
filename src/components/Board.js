class Tile {

  static COLORS = ['red', 'organge', 'yellow', 'green', 'blue', 'purple'];
  static SHAPES = ['circle', 'squre', 'plus', 'clover', 'star', 'burst'];
  static REPEATS = 3;

  static getFullSet(){
    var tiles = [];
    Tile.COLORS.forEach(color => {
      Tile.SHAPES.forEach(shape => {
        for(let r = 0;  r < Tile.REPEATS; r++){
          tiles.push(new Tile(color, shape));
        }
      });
    });
    return tiles;
  }

  static getMaxLineLength(){
    return Math.max(Tile.COLORS.length, Tile.SHAPES.length);
  }

  constructor(color, shape) {
    this.color = color;
    this.shape = shape;
  }
}

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

class Player {

  constructor(name){
    this.name = name;
  }

  getMoves(){
    return [];
  }

  getPoints(){
    this.getMoves().reduce(
      (acc, move) => acc + move.getPoints(), 
      0
    );
  }
}

class Move {
  
  status     = 'pending';
  placements = [];

  constructor(player){
    this.player;
  }

  addPlacement(placement){

    // TODO: throw excption if plaments overlap
    this.placements.push(placement);
  }

  removePlacment(index){

    // TODO: exception if index not in current placements
    // remov
  }

  complete(){
    this.status = 'complete';
  }

  getPoints(){
    return 5;
  }
}

class Placement {
  constructor(row, col, tile){
    this.row = row;
    this.col = col;
    this.tile = tile;
  }
}

class Bag {

  tiles;

  constructor(){
    this.tiles = Tile.getFullSet();
  }

  tradeTiles(inputTiles){

    // TODO: exception if input.size > this.tiles.size

    // first draw as many outputs as were input
    var outputTiles = inputTiles.map(() => this.drawTile());

    // next replace your inputs back in the bag
    inputTiles.forEach(inputTile => this.tiles.push(inputTile));

    // finally return the set you drew before replacemnt
    return outputTiles;
  }

  drawTile(){
    return this.tiles.pop();
  }

}