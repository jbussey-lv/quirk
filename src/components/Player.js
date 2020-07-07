class Player {

  constructor(name, bag, hand, handSize){
    this.name     = name;
    this.bag      = bag;
    this.hand     = hand;
    this.handSize = handSize;
  }

  addTileToMove(move, row, col, handIndex){
    var tile = hand.returnOneTile(handIndex)
    move.recieveOneTile(tile, row, col);
  }

  removeTileFromMove(move, moveIndex){
    var tile = move.returnOneTile(moveIndex);
    this.hand.receiveOneTile(tile);
  }

  cancelMove(move){
    var tiles = move.returnAllTiles();
    this.hand.receiveManyTiles(tiles);
  }

  replenishTiles(){
    var numberNeeded  = this.handSize - hand.getCount();
    var numberToTake  = Math.min(numberNeeded, this.bag.getCount());
    var bagTiles      = this.bag.supplyManyRandomTiles(numberToTake);

    this.hand.receiveManyTiles(bagTiles);
  }

  tradeTiles(tileIndexes){

      // pull the set out of your hand that you want to trade
      var handTiles = this.hand.supplyManyTiles(tileIndexes);

      // pull equal number from bag
      var bagTiles  = this.bag.supplyManyRandomTiles(tileIndexes.length);

      // put the ones from the bag into our hand
      this.hand.receiveManyTiles(bagTiles);

      // put the ones from your hand into the bag
      this.bag.receiveManyTiles(handTiles);
  }
}

module.exports = Player;