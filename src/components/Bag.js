var shuffle = require('shuffle-array');

class Bag {

  tiles;

  constructor(tiles){
    this.tiles = tiles;
  }

  tradeTiles(inputTiles){

    // first draw as many as we're returing...
    var outputTiles = this.drawTiles(inputTiles.length);

    // only THEN replace the ones you're trading into the bag
    this.replaceTiles(inputTiles);

    // finally return the set you drew before replacemnt
    return outputTiles;
  }

  drawTile(){
    if(this.tiles.length < 1){
      throw new Error('You can not draw when the bag is empty');
    }
    
    shuffle(this.tiles);

    return this.tiles.pop();
  }

  drawTiles(number=0){

    if(number > this.tiles.length){
      throw new Error('You can not draw more tiles than are in the bag');
    }
    var drawn = [];
    for(let i=0; i<number; i++){
      drawn.push(this.drawTile());
    }
    return drawn;
  }

  replaceTile(tile){
    this.tiles.push(tile);
    return this;
  }

  replaceTiles(tiles){
    tiles.forEach(tile => this.replaceTile(tile));
    return this;
  }

}

module.exports = Bag;