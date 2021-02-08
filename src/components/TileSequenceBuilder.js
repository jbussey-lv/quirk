import TileSequence from './TileSequence.js';
import Tile from './Tile.js';

export default class TileSequenceBuilder {

  constructor(){
    this.tiles = [];
  }

  addTile(color, shape){
    this.tiles.push(new Tile(color, shape));
    return this;
  }

  build(){
    return new TileSequence(this.tiles);
  }
}