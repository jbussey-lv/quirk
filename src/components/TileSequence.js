class TileSequence {

  constructor(tiles){
    this.tiles = tiles;
  }

  isIllegal(){
    return this._hasNoPattern() ||
           this._hasRepeats();
  }

  _hasNoPattern(){

    return this._getUniqueVals('color').size > 1 &&
           this._getUniqueVals('shape').size > 1;
  }

  _hasRepeats(){
    var combos = this.tiles.map(tile => JSON.stringify(tile));

    var comboSet = new Set(combos);

    return comboSet.size < this.tiles.length;
  }

  _getUniqueVals(prop){
    var vals = this.tiles.map(tile => {
      return tile[prop];
    });
    return new Set(vals);
  }
}

module.exports = TileSequence;