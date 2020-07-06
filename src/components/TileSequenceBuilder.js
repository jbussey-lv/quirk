const TileSequence = require('./TileSequence.js');
const Tile = require('./Tile.js');

class TileSequenceBuilder {

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

module.exports = TileSequenceBuilder;