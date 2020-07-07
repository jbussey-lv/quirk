
const Player = require('./Player.js');
const Board = require('./Board.js');
const Tile = require('./Tile.js');
const Placement = require('./Placement.js');
const Move = require('./Move.js');
const Hand = require('./Hand.js');
const Bag = require('./Bag.js');

class MoveBuilder {

  constructor(board = new Board()){
    this.board = board;
    this.player = new Player("John Doe");
    this.hand = new Hand(new Bag(), 6);
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