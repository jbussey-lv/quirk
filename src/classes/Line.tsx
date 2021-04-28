import Tile, { Color, Shape, TileInterface } from '../features/tile/Tile';

const COLORS_LENGTH = Object.keys(Color).length;
const SHAPES_LENGTH = Object.keys(Shape).length;

export default class TileSequence {

  tiles: TileInterface[];

  constructor(tiles: TileInterface[]){

    if(tiles.length < 2){
      throw new Error('lines must be at least two element long');
    }
    this.tiles = tiles;
  }

  isIllegal(){
    return this._breaksPattern() ||
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

  _breaksPattern(){
    return this._getColorCount() > 1 &&
           this._getShapeCount() > 1;
  }

  _hasRepeats(){
    var combos = this.tiles.map(tile => JSON.stringify(tile));

    var comboSet = new Set(combos);

    return comboSet.size < this.tiles.length;
  }

  _getColorCount(){
    return this._getUniqueShapeVals().size;
  }

  _getShapeCount(){
    return this._getUniqueColorVals().size;
  }

  _getUniqueColorVals(): Set<Color> {
    var vals = this.tiles.map(tile => {
      return tile.color;
    });
    return new Set(vals);
  }

  _getUniqueShapeVals(): Set<Shape> {
    var vals = this.tiles.map(tile => {
      return tile.shape;
    });
    return new Set(vals);
  }

}