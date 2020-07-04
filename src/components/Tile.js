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