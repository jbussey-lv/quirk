var Tile = require('./Tile.js');

class TileSequence {

  constructor(tiles){

    if(tiles.length < 2){
      throw new Error('sequences must be at least two element long');
    }
    this.tiles = tiles;
  }

  isIllegal(){
    return this._hasNoPattern() ||
           this._hasRepeats();
  }

  getPoints(){
    if(this.isIllegal()){return 0;}

    var points = this.tiles.length;

    if(this._getUniqueVals('color').size === Tile.COLORS.length){
      points += Tile.COLORS.length;
    }

    if(this._getUniqueVals('shape').size === Tile.SHAPES.length){
      points += Tile.SHAPES.length;
    }

    return points;
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

  static getSequencesFromGrid(grid){
    var sequences = [];
    TileSequence.gridToLines(grid).forEach(line => {
      TileSequence.lineToSqueces(line).forEach(sequence => {
        sequence.push(sequence);
      })
    })
    return sequences;
  }

  static gridToLines(grid){
    var lines = [];
    grid.forEach(row => {
      lines.push(row);
    })

  }

  static lineToSequences(line){
    var sequences = [];
    var aggregator = [];
    line.forEach(tile => {
      if(tile == null){
        if(aggregator.length > 1){
          sequences.push(aggregator.splice(0));
        }
        aggregator = [];
      }else{
        aggregator.push(tile);
      }
    });
    if(aggregator.length > 1){
      sequences.push(aggregator.slice(0));
    }
    return sequences;
  }


}

module.exports = TileSequence;