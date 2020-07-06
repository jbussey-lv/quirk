var assert = require('assert');
var Board = require('../src/components/Board.js');
const BoardBuilder = require('../src/components/BoardBuilder.js');

beforeEach(function(){
  this.board = (new BoardBuilder())
                .addTile(1, 1, 'red', 'circle')
                .addTile(1, 2, 'red', 'square')
                .addTile(1, 3, 'red', 'cross')
                .addTile(1, 4, 'red', 'clover')
                .addTile(5, 5, 'green', 'star')
                .addTile(6, 5, 'yellow', 'star')
                .addTile(7, 5, 'blu', 'star')
                .addTile(8, 5, 'orange', 'star')
                .build();

  this.grid = this.board.getGrid();
});

describe('Board', function () {

  describe('isSpaceTaken()', function () {
    it('should return TRUE if a placement of a current move is there', function () {
      assert(this.board.isSpaceTaken(1,1) === true);
    });

    it('should return FALSE if a placement of a current move is not there', function () {
      assert(this.board.isSpaceTaken(0,1) === false);
    });

    it('should throw error if we ask about space that is out of bounds low', function () {
      assert.throws(()=>{board.isSpaceTaken(-1,1)}, Error);
    });

    it('should throw error if we ask about space that is out of bounds high', function () {
      assert.throws(()=>{board.isSpaceTaken(1,1000)}, Error);
    });
  });

  describe('getGrid()', function () {

    it('should return a 2d array of proper width and height', function () {
      assert(Array.isArray(this.grid));
      assert(Array.isArray(this.grid[0]));
      assert.equal(this.grid.length, Board.GRID_HEIGHT);
      assert.equal(this.grid[0].length, Board.GRID_WIDTH);
    });

    it('should return a grid with spaces filled with tiles from moves', function () {
      var tile1 = this.grid[1][1];
      var tile2 = this.grid[8][5];
      
      assert(tile1.color === 'red' && tile1.shape === 'circle');
      assert(tile2.color === 'orange' && tile2.shape === 'star');
    });

    it('should return a grid with spaces null if no move there', function () {
      assert.equal(this.grid[10][10], null);
    });


  });

});
