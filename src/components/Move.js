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
    return this._isNotLinear() ||
           this._hasNoThroughLine() ||
           this.board.isIllegal();
  }

  _isNotLinear(){

    // if we're empty... we're good
    if(this.placements.length === 0){return false;}

    var bounds = this._getBounds();

    return bounds.minRow !== bounds.maxRow &&
           bounds.minCol !== bounds.maxCol;
  }

  _hasNoThroughLine(){
    
    // figure out whether to traverse row or col
    // figure low and high
    // traverse from low to high and if any spaces found
    //   return true
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