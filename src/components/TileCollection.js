class TileCollection {

    tiles = [];

    constructor(tiles=[]){
      this.receiveManyTiles(tiles);
    }
  
    getCount(){
      return this.tiles.length;
    }

    supply(){}

    receiveOneTile(tile){
      this.receiveMany([tile]);
    }
  
    receiveManyTiles(tiles){
      this.tiles.push(...tiles);
      return this;
    }
    
}

module.exports = TileCollection;