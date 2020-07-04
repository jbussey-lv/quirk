class Bag {

  tiles;

  constructor(){
    this.tiles = Tile.getFullSet();
  }

  tradeTiles(inputTiles){

    // TODO: exception if input.size > this.tiles.size

    // first draw as many outputs as were input
    var outputTiles = inputTiles.map(() => this.drawTile());

    // next replace your inputs back in the bag
    inputTiles.forEach(inputTile => this.tiles.push(inputTile));

    // finally return the set you drew before replacemnt
    return outputTiles;
  }

  drawTile(){

    // TODO: make it draw randomly
    //       we won't shuffle, we'll always just pull ramdom
    return this.tiles.pop();
  }

}