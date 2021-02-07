import { strict as assert } from 'assert';
import Tile, {COLORS, SHAPES, REPEATS, getFullSet} from '../src/components/Tile.js';

describe('Tile', function () {

  describe('Tile Object', function () {

    it('should equate like tiles', function() {
      let tile1 = new Tile(COLORS.RED, SHAPES.SQUARE);
      let tile2 = new Tile(COLORS.RED, SHAPES.SQUARE);
      assert(tile1.matches(tile2));
    });

    it('should not equate different tiles', function() {
      let tile1 = new Tile(COLORS.RED, SHAPES.SQUARE);
      let tile2 = new Tile(COLORS.RED, SHAPES.CIRCLE);
      assert(!tile1.matches(tile2));
    });

    it('should not equate different tiles', function() {
      let tile1 = new Tile(COLORS.RED, SHAPES.SQUARE);
      let tile2 = new Tile(COLORS.BLUE, SHAPES.SQUARE);
      assert(!tile1.matches(tile2));
    });

    it('should not equate different tiles', function() {
      let tile1 = new Tile(COLORS.RED, SHAPES.SQUARE);
      let tile2 = new Tile(COLORS.BLUE, SHAPES.PLUS);
      assert(!tile1.matches(tile2));
    });
  });

  describe('getFullSet() fuction', function () {
    it('gets correct number of tiles for full set', function() {
      let tiles = getFullSet();
      let expectedCount = Object.keys(COLORS).length
                        * Object.keys(SHAPES).length
                        * REPEATS;
      assert.equal(tiles.length, expectedCount);
    });

    it('makes sure there are correct number of repeats', function(){
      let tiles = getFullSet();
      let target = new Tile(COLORS.RED, SHAPES.SQUARE);
      let filtered = tiles.filter(tile => tile.matches(target));

      assert.equal(filtered.length, REPEATS);
    });
  });

});