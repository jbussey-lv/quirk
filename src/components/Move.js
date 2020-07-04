class Move {
  
  status     = 'pending';
  placements = [];

  constructor(player){
    this.player;
  }

  addPlacement(placement){

    // TODO: throw excption if plaments overlap
    this.placements.push(placement);
  }

  removePlacment(index){

    // TODO: exception if index not in current placements
    // remov
  }

  complete(){
    this.status = 'complete';
  }

  getPoints(){
    return 5;
  }
}