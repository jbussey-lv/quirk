var assert = require('assert');
var Board = require('../src/components/Board.js');
// var Board = require('../src/components/Player.js');
// var Board = require('../src/components/Player.js');
// var Board = require('../src/components/Player.js');




describe('Board', function () {

  beforeEach(() => {
    board = new Board();
    move = {
      placements: [
        {row: 1, col: 1, tile: {}},
        {row: 1, col: 2, tile: {}},
        {row: 1, col: 3, tile: {}},
        {row: 1, col: 4, tile: {}},
      ]
    };
    board.addMove(move);
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

});
