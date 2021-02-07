export default class TileCollection {

  constructor(tiles=[]){
    this.tiles = [];
    this.addManyTiles(tiles);
  }

  addTile(tile){
    this.addManyTiles([tile]);
    return this;
  }

  addManyTiles(tiles){
    this.tiles.push(...tiles);
    return this;
  }

  returnTile(index=0){

    if(this._isIndexOutOfBounds(index)){
      throw new Error('index out of bounds');
    }

    return this.tiles.splice(index, 1)[0];
  }

  returnManyTiles(count){
    return this.tiles.splice(0, count);
  }
  
  getCount(){
    return this.tiles.length;
  }

  getTiles(){
    return this.tiles;
  }

  _isIndexOutOfBounds(tileIndex){
    return tileIndex < 0 ||
            tileIndex >= this.getCount();
  }

}