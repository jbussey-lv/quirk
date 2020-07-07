var shuffle = require('shuffle-array');
const TileCollection = require('./TileCollection');

class Bag extends TileCollection{

  supply(quantity){

    if(quantity > this.getCount()){
      throw new Error('You can\'t draw more than are in the bag');
    }

    shuffle(this.tiles);

    return this.tiles.splice(0, quantity);
  }

}

module.exports = Bag;