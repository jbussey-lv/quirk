class TileCollection {

    tiles = [];

    constructor(tiles=[]){
      this.receive(tiles);
    }
  
    getCount(){
      return this.tiles.length;
    }

    supply(){}

    receiveOne(tile){
      this.receiveMany([tile]);
    }
  
    receiveMany(tiles){
      this.tiles.push(...tiles);
      return this;
    }
    
}

module.exports = TileCollection;