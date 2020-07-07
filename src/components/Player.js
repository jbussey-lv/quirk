class Player {

  constructor(name, bag, hand, handSize){
    this.name     = name;
    this.bag      = bag;
    this.hand     = hand;
    this.handSize = handSize;
  }

  replenishHand(){
    var numberNeeded  = this.handSize - this.getCount();
    var numberToTake  = Math.min(numberNeeded, this.bag.getCount());
    var bagTiles    = this.bag.supply(numberToTake);

    this.receive(bagTiles);
  }

  tradeTiles(tileIndexes){

      // pull the set out of your hand that you want to trade
      var handTiles = this.hand.supplyMany(tileIndexes);

      // pull equal number from bag
      var bagTiles  = this.bag.supply(tileIndexes.length);

      // put the ones from the bag into our hand
      this.hand.receive(bagTiles);

      // put the ones from your hand into the bag
      this.bag.receive(handTiles);
  }


}

module.exports = Player;