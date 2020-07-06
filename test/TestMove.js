const assert = require('assert');
const Move = require('../src/components/Move.js');
const Placement = require('../src/components/Placement.js');
const Tile = require('../src/components/Tile.js');
const Board = require('../src/components/Board.js');
const MoveBuilder = require('../src/components/MoveBuilder.js');
const Player = require('../src/components/Player.js');
const BoardBuilder = require('../src/components/BoardBuilder.js');


before(function(){
  this.player = new Player("John Doe");
  this.redCircleTile = new Tile("red", "circle");
});

describe('Move', function () {

  describe('addPlacement()', function() {

    it('should throw error if you try to add tile that overlaps previous play', function() {

      var board = (new BoardBuilder())
                    .addTile(1, 1, "red", "square")
                    .build();

      var move = (new MoveBuilder(board))
                    .build();

      var overlappingPlacement = new Placement(1, 1, this.redCircleTile);

      assert.throws(function(){
        move.addPlacement(overlappingPlacement);
      }, Error);
    });

    it('should throw error if you try to add tile that overlaps other from this move', function() {
      
      var move = (new MoveBuilder())
                    .addTile(1, 1, "red", "square")
                    .build();

      var overlappingPlacement = new Placement(1, 1, this.redCircleTile);

      assert.throws(function(){
        move.addPlacement(overlappingPlacement);
      }, Error);
        
    });

  });
  
  describe('isIllegal()', function () {

    it('should return true if not linear', function () {

      var move = (new MoveBuilder())
                  .addTile(3, 0, 'blue', 'square')
                  .addTile(3, 1, 'blue', 'circle')
                  .addTile(4, 2, 'blue', 'plus')
                  .build();

      assert(move.isIllegal());
    });

  

  });

});
