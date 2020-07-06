class Move {
  
  constructor(player, board){
    this.player     = player;
    this.board      = board;
    this.status     = 'pending';
    this.placements = [];
    this.points     = null;

    this.board.addMove(this);
  }

  addPlacement(placement){

    if(this.board.isSpaceTaken(placement.row, placement.col)){
      throw new Error('You can\'t add placements that overlap others');
    }

    this.placements.push(placement);

    return this;
  }

  removePlacment(index){

    // throw error if you try to remove a placement that doesn't exist
    if(index < 0 || index >= this.placements.length){
      throw new Error('You can\'t remove a placement that doesn\'t exist in the move');
    }

    var placement = this.placements.splice(index,1)[0];

    return placement;
  }

  submit(){

    if(this.isIllegal()){
      throw new Error('That move is illegal move');
    }
    this.status = 'submitted';
    this.points = this.getPotentialPoints();
  }

  getPotentialPoints(){
    return 5;
  }

  isIllegal(){
    return this._hasNoThroughLine() ||
           this.board.isIllegal();
  }

  _hasNoThroughLine(){

    if(this.placements.length === 0){return false;}

    var bounds = this._getBounds();
    var colDiff = 0;
    var rowDiff = 0;

    if(bounds.minCol === bounds.maxCol){rowDiff = 1;}
    else if(bounds.minRow === bounds.maxRow){colDiff = 1;}
    else{return true;} // this means they're non-linear}

    var col = bounds.minCol;
    var row = bounds.minRow;
    while(row <= bounds.maxRow && col <= bounds.maxCol ){
      if(!this.board.isSpaceTaken(row, col)){
        return true;
      }

      row += rowDiff;
      col += colDiff;
    }

    return false;
  }

  _getBounds(){
    return {
      minRow: this._getExtreme(Math.min, 'row'),
      maxRow: this._getExtreme(Math.max, 'row'),
      minCol: this._getExtreme(Math.min, 'col'),
      maxCol: this._getExtreme(Math.max, 'col')
    }
  }

  _getExtreme(func, prop){
    return this.placements.reduce((currentMin, placement)=>{
      return func(currentMin, placement[prop]);
    }, this.placements[0][prop]);
  }

}

module.exports = Move;