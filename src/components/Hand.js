import TileCollection from './TileCollection.js';

const MAX_SIZE = 6;

export default class Hand extends TileCollection{

  addTile(tile){

    if(this._violatesMaxSize([tile])){
      throw new Error('would add beyond max hand size');
    }

    super.addTile(tile);
  }

  addManyTiles(tiles){

    if(this._violatesMaxSize(tiles)){
      throw new Error('would add beyond max hand size');
    }

    super.addManyTiles(tiles);
  }

  _violatesMaxSize(tiles){
    return this.getCount() + tiles.length > MAX_SIZE;
  }

}