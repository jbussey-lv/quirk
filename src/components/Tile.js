export const COLORS = {
  RED: 'red',
  ORANGE: 'orange', 
  YELLOW: 'yellow',
  GREEN: 'green',
  BLUE: 'blue',
  PURPLE: 'purple'
};

export const SHAPES = {
  CIRCLE: 'circle', 
  SQUARE: 'square', 
  PLUS: 'plus', 
  CLOVER: 'clover',
  STAR: 'star',
  BURST: 'burst'
}

export const REPEATS = 3;

export function getFullSet(){
  let tiles = [];
  for(const color of Object.values(COLORS)){
    for(const shape of Object.values(SHAPES)){
      for(let i = 0; i < REPEATS; i++){
        tiles.push(new Tile(color, shape));
      }
    }
  }
  return tiles;
}


export default class Tile {

  constructor(color, shape){
    this.color = color;
    this.shape = shape;
  }

  matches(tile){
    return this.color === tile.color &&
           this.shape === tile.shape;
  }

}
