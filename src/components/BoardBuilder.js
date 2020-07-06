
const Player = require('./Player.js');
const Board = require('./Board.js');
const Tile = require('./Tile.js');
const Placement = require('./Placement.js');
const Move = require('./Move.js');
const MoveBuilder = require('./MoveBuilder.js');

class BoardBuilder {

  constructor(){
    this.board = new Board();
    this.moveBuider = new MoveBuilder(this.board);
  }

  addTile(row, col, color, shape){
    this.moveBuider.addTile(row, col, color, shape);
    return this;
  }

  build(){
    this.moveBuider.build();
    return this.board;
  }
}

module.exports = BoardBuilder;