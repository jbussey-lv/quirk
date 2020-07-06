const assert = require('assert');
const Move = require('../src/components/Move.js');
const Player = require('../src/components/Player.js');
const Placement = require('../src/components/Placement.js');
const Tile = require('../src/components/Tile.js');
const Board = require('../src/components/Board.js');

var a = "aaa";


before(function(){
  this.moveBuilder = function(placements, board){
    console.log(s);
  }
});

describe('Move', function () {

  beforeEach(function () {
    const board = new Board();
    const player = new Player('John');
    this.move = new Move(player, board);
  });
  
  describe('isIllegal', function () {

    it('should return true if not in one line', function () {

      // this.moveBuilder(4);

      this.move.addPlacement(
        new Placement(3, 0, new Tile("blue", "square"))
      )
      .addPlacement(
        new Placement(3, 1, new Tile("blue", "square"))
      ).addPlacement(
        new Placement(4, 2, new Tile("blue", "square"))
      );

      assert.strictEqual(this.move.isIllegal(), true);
    });
  

  });

});
