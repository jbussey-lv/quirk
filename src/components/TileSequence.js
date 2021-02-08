import Tile, { COLORS, SHAPES } from './Tile.js';

const COLORS_LENGTH = Object.keys(COLORS).length;
const SHAPES_LENGTH = Object.keys(SHAPES).length;

export default class TileSequence {


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

    if(this._getColorCount() === COLORS_LENGTH){
      points += COLORS_LENGTH;
    }

    if(this._getShapeCount() === SHAPES_LENGTH){
      points += SHAPES_LENGTH;
    }

    return points;
  }

  _getColorCount(){
    return this._getUniqueVals('color').size;
  }

  _getShapeCount(){
    return this._getUniqueVals('shape').size;
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
