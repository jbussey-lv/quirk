const TileCollection = require('./TileCollection');

class Hand extends TileCollection{

    constructor(bag, handSize){
        this.bag        = bag;
        this.handSize   = handSize;
        this.replenish();
    }

    supply(tileIndexes){

        if(this._areIndexesOutOfBounds(tileIndexes)){throw new Error('indexes out of bounds');}

        if(this._areIndexesDuplicated(tileIndexes)){throw new Error('indexes duplicated');}

        var toSupply = [];

        tileIndexes.forEach(tileIndex => {
            toSupply.push(this.tiles.splice(tileIndex, 1));
        });

        return toSupply;
    }

    replenish(){
        var numberNeeded  = this.handSize - this.getCount();
        var numberToTake  = Math.min(numberNeeded, this.bag.getCount());
        var withdrawal    = this.bag.supply(numberToTake);

        this.hand.receive(withdrawal);
    }

    trade(indexes){

        // pull the set out of your hand that you want to trade
        var handTiles = this.hand.supply(indexes);
    
        // pull equal number from bag
        var bagTiles  = this.bag.supply(indexes.length);
    
        // put the ones from the bag into our hand
        this.hand.receive(bagTiles);
    
        // put the ones we wanted to get rid of into the bag
        this.bag.receive(handTiles);
    
      }
    
    _areIndexesOutOfBounds(tileIndexes){
        return Math.max(...tileIndexes) >= this.getCount() ||
               Math.min(...tileIndexes) < 0;

    }

    _areIndexesDuplicated(tileIndexes){
        return (new Set(tileIndexes)).size < tileIndexes.length;
    }

}

module.exports = Hand;