var assert = require('assert');
var Board = require('../src/components/Board.js');

describe('Board', function () {

  beforeEach(() => {
    board = new Board();
    move1 = {
      placements: [
        {row: 1, col: 1, tile: '1-1'},
        {row: 1, col: 2, tile: '1-2'},
        {row: 1, col: 3, tile: '1-3'},
        {row: 1, col: 4, tile: '1-4'}
      ]
    };
    move2 = {
      placements: [
        {row: 5, col: 5, tile: '5-5'},
        {row: 6, col: 5, tile: '6-5'},
        {row: 7, col: 5, tile: '7-5'},
        {row: 8, col: 5, tile: '8-5'}
      ]
    };
    board.addMove(move1);
    board.addMove(move2);
    grid = board.getGrid();
  });

  describe('isSpaceTaken()', function () {
    it('should return TRUE if a placement of a current move is there', function () {
      assert(board.isSpaceTaken(1,1) === true);
    });

    it('should return FALSE if a placement of a current move is not there', function () {
      assert(board.isSpaceTaken(0,1) === false);
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
      assert(Array.isArray(grid));
      assert(Array.isArray(grid[0]));
      assert.equal(grid.length, Board.GRID_HEIGHT);
      assert.equal(grid[0].length, Board.GRID_WIDTH);
    });

    it('should return a grid with spaces filled with tiles from moves', function () {
      assert.equal(grid[1][1], '1-1');
      assert.equal(grid[8][5], '8-5');
    });

    it('should return a grid with spaces null if no move there', function () {
      assert.equal(grid[10][10], null);
    });


  });

});
