class Move {
  
  status     = 'pending';
  placements = [];
  points;

  constructor(player, board){
    this.player = player;
    this.board = board;
    this.board.addMove(this);
  }

  overlapsExistingPlacements(placement){
    var overlaps = false;
    this.placements.forEach((existingPlacement) => {
      if(placement.overlaps(existingPlacement)){
        overlaps = true;
      }
    });
    return overlaps;
  }

  addPlacement(placement){

    if(this.overlapsExistingPlacements(placement)){
      throw new Error('You can\'t add placements that overlap others already in the move');
    }

    this.placements.push(placement);

    return this;
  }

  removePlacment(index){

    // throw error if you try to remove a placement that doesn't exist
    if(index < 0 || index >= this.placements.length){
      throw new Error('You can\'t remove a placement that doesn\'t exist in the move');
    }

    // TODO: exception if index not in current placements
    // remov
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
    return this._overlapsExistingMoves() ||
           this._isNonLinear() ||
           this._hasNoPattern() ||
           this._hasNoThroughLine() ||
           this._breaksExistingPatterns();
  }

  _overlapsExistingMoves(){
    return this.placements.reduce((memo, placement)=>{
      return memo || this.board.isSpaceTaken(placement.row, placement.col);
    }, false);
  }

  _isNonLinear(){
    var uniqueRows = this._getUniquePlacementVals('row');
    var uniqueCols = this._getUniquePlacementVals('col');

    return uniqueCols.size > 1 &&
           uniqueRows.size > 1;
  }

  _hasNoPattern(){

    var uniqueColors = this._getUniquePlacementVals('color');
    var uniqueShapes = this._getUniquePlacementVals('shape');

    return uniqueColors.size > 1 &&
           uniqueShapes.size > 1;
  }

  _hasNoThroughLine(){
    // figure out whether to traverse row or col
    // figure low and high
    // traverse from low to high and if any spaces found
    //   return true
    return false;
  }

  _getUniquePlacementVals(prop){
    var fullVals = this.placements.map((placement)=>{
      placement[prop];
    });
    return new Set(fullVals);
  }

  _getUniqueTileVals(prop){
    var fullVals = this.placements.map((placement)=>{
      placement.tile[prop];
    });
    return new Set(fullVals);
  }
}

module.exports = Move;