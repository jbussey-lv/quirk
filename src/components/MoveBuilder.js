import Tile from './Tile.js';
import Move from './Move.js';

export default class MoveBuilder {

  constructor(){
    this.move = new Move();
  }

  addTile(row, col, color, shape){
    var tile = new Tile(color, shape);
    this.move.addTile(row, col, tile);
    return this;
  }

  build(){
    return this.move;
  }
  
}