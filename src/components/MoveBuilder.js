
const Player = require('./Player.js');
const Board = require('./Board.js');
const Tile = require('./Tile.js');
const Placement = require('./Placement.js');
const Move = require('./Move.js');

class MoveBuilder {

  constructor(board = null){
    this.board = board == null ?
                 new Board() :
                 board;
    this.player = new Player("John Doe");
    this.placements = [];
  }

  addTile(row, col, color, shape){
    var tile = new Tile(color, shape);
    this.placements.push(new Placement(row, col, tile));
    return this;
  }

  build(){
    var move = new Move(this.player, this.board);
    this.placements.forEach(placement => {
      move.addPlacement(placement);
    });
    return move;
  }
}

module.exports = MoveBuilder;