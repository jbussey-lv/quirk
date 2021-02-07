import shuffle from 'shuffle-array';
import TileCollection from './TileCollection.js'

export default class Bag extends TileCollection{

  constructor(tiles = Tile.getFullSet()){
    super(tiles);
  }

  drawTiles(quantity){

    if(quantity > this.getCount()){
      throw new Error('You can\'t draw more than are in the bag');
    }

    shuffle(this.tiles);

    return this.returnManyTiles(quantity);
  }

  tradeTiles(tiles){
    let response = this.drawTiles(tiles.length);
    this.addManyTiles(tiles);
    return response;
  }

}
