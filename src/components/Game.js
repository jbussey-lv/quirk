const Board = require("./Board");
const Player = require("./Player");
const Move = require("./Move");
const Bag = require("./Bag");

const Move      = require('./Move.js');
const Bag       = require('./Bag.js');
const Player    = require('./Player.js');
const Tile      = require('./Tile.js');
const Hand = require("./Hand");

class Game {

    handSize = 6;

    constructor(){
        this.bag     = new Bag(Tile.getFullSet());
        this.board   = new Board();
        this.players = [];
        this.moves   = [];
    }

    addPlayer(name){
        var hand    = new Hand(this.bag, this.handSize);
        var player  = new Player(name, hand);
        this.players.push(player);
    }

    

}

module.exports = Game;