import { strict as assert } from 'assert';
import Tile, {COLORS, SHAPES} from '../src/components/Tile.js';
import Move from '../src/components/Move.js';
import MoveBuilder from '../src/components/MoveBuilder.js'

before(function(){
  this.redCircleTile = new Tile(COLORS.RED, SHAPES.CIRCLE);
  this.blueSquareTile = new Tile(COLORS.BLUE, SHAPES.SQUARE);
});

describe('Move', function () {

  describe('addPlacement()', function() {

    it('should throw error if you try to add tile that overlaps other from this move', function() {
      
      var move = (new MoveBuilder())
                    .addTile(1, 1, this.redCircleTile)
                    .build();

      assert.throws(function(){
        move.addTile(1, 1, this.redCircleTile);
      }, Error);
    
    });

    it('should allow multiple tiles added', function(){
      let move = new Move();
      move.addTile(2, 3, this.redCircleTile);
      move.addTile(3, 4, this.blueSquareTile);
      assert.equal(move.placements.length, 2);
    })

  });
  
});
