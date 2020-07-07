class Tile {

  static COLORS = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];
  static SHAPES = ['circle', 'square', 'plus', 'clover', 'star', 'burst'];
  static REPEATS = 3;

  constructor(color, shape) {
    if(!Tile.COLORS.includes(color) || !Tile.SHAPES.includes(shape)){
      throw new Error('You can\'t create with a color or shape undefined for the class: ' + color + ' - ' + shape);
    }
    this.color = color;
    this.shape = shape;
  }

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
}


module.exports = Tile;