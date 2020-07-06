const assert = require('assert');
const Placement = require('../src/components/Placement.js');
const Tile = require('../src/components/Tile.js');
const Board = require('../src/components/Board.js');
const MoveBuilder = require('../src/components/MoveBuilder.js');
const Player = require('../src/components/Player.js');
const BoardBuilder = require('../src/components/BoardBuilder.js');


before(function(){
  this.player        = new Player("John Doe");
  this.redCircleTile = new Tile("red", "circle");
});

beforeEach(function(){
  this.emptyBoard    = new Board();
});

describe('Move', function () {

  describe('addPlacement()', function() {

    it('should throw error if you try to add tile out of bounds', function() {

      var moveBuilderLow = (new MoveBuilder())
                             .addTile(-1, 1, "red", "square");

      var moveBuilderLow = (new MoveBuilder())
                            .addTile(250, 1, "red", "square");

      assert.throws(function(){moveBuilderLow.build()}, Error);
      assert.throws(function(){moveBuilderHigh.build()}, Error);
    });

    it('should throw error if you try to add tile that overlaps previous move', function() {

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

    it('should return true if not linear', function(){
      var move = (new MoveBuilder())
                  .addTile(3, 0, 'blue', 'square')
                  .addTile(3, 1, 'blue', 'circle')
                  .addTile(4, 2, 'blue', 'plus')
                  .build();

      assert(move.isIllegal());
    });

    it('should return true if we add disjoint tiles', function(){
      var move = (new MoveBuilder())
                  .addTile(3, 0, 'blue', 'square')
                  .addTile(3, 2, 'blue', 'plus')
                  .addTile(3, 3, 'blue', 'plus')
                  .build();

      assert(move.isIllegal());
    });

    it('should return false if we add a single tile to a blank board', function(){

      var move = (new MoveBuilder(this.emptyBoard))
                  .addTile(100, 100, 'blue', 'plus')
                  .build();
      
       assert.strictEqual(move.isIllegal(), false);
    });

    it('should return false if we add a valid three sequence to a blank board', function(){

      var move = (new MoveBuilder(this.emptyBoard))
                  .addTile(100, 100, 'blue', 'plus')
                  .addTile(100, 101, 'blue', 'circle')
                  .addTile(100, 102, 'blue', 'square')
                  .build();
      
       assert.strictEqual(move.isIllegal(), false);
    });

    it('should return false if we add disjoint tiles around existing ones', function(){

      var board = (new BoardBuilder())
                  .addTile(1, 1, 'red', 'circle')
                  .addTile(1, 2, 'red', 'square')
                  .build();
      
      var move = (new MoveBuilder(board))
                  .addTile(1, 0, 'red', 'plus')
                  .addTile(1, 3, 'red', 'clover')
                  .build();
      
       assert.strictEqual(move.isIllegal(), false);
    });

  });
});
