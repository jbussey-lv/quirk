class Bag {

  tiles;

  constructor(tiles){
    this.tiles = tiles;
  }

  tradeTiles(inputTiles){

    // TODO: throw exception if input.size > this.tiles.size

    // first draw as many as we're returing...
    var outputTiles = this.drawTiles(inputTiles.length);

    // only THEN return the ones we're giving back
    this.returnTiles(inputTiles);

    // finally return the set you drew before replacemnt
    return outputTiles;
  }

  drawTile(){

    // TODO: make it draw randomly
    //       we won't shuffle, we'll always just pull ramdom
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

  returnTile(tile){
    this.tiles.push(tile);
    return this;
  }

  returnTiles(tiles){
    tiles.forEach(tile => this.returnTile(tile));
    return this;
  }

}

module.exports = Bag;