export default class TileCollection {

    constructor(tiles=[]){
      this.tiles = tiles;
    }

    addTile(tile){
      this.tiles.push(tile);
      return this;
    }

    addManyTiles(tiles){
      this.tiles.push(...tiles);
    }

    returnTile(index=0){

      if(this._isIndexOutOfBounds(tileIndex)){throw new Error('index out of bounds');}

      return this.tiles.splice(index, 1);
    }
  
    returnManyTiles(count){
      return this.tiles.splice(0, count);
    }
    
    getCount(){
      return this.tiles.length;
    }

    _isIndexOutOfBounds(tileIndex){
      return this._areIndexesOutOfBounds([tileIndex]);
  }
}