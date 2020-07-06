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
    var uniqueRows = this._getUniquePlacementVals('row');
    var uniqueCols = this._getUniquePlacementVals('col');

    return uniqueCols.size > 1 &&
           uniqueRows.size > 1;
  }

  _getUniquePlacementVals(prop){
    var fullVals = this.placements.map((placement)=>{
      return placement[prop];
    });
    return new Set(fullVals);
  }

  _hasNoThroughLine(){
    // figure out whether to traverse row or col
    // figure low and high
    // traverse from low to high and if any spaces found
    //   return true
    return false;
  }

}

module.exports = Move;