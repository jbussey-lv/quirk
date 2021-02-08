import Placement from './Placement.js';

export const STATUSES = {
  PENDING: 'pending',
  COMPLETE: 'complete'
}

export default class Move {
  
  constructor(){
    this.placements = [];
    this.status     = STATUSES.PENDING;
    this.points     = 0;
  }

  addTile(row, col, tile){
    if(this.__placementExists(row, col)){
      throw new Error('You can\'t put two tiles in the same position');
    }
    var placement = new Placement(row, col, tile);
    this.placements.push(placement);
    return this;
  }

  returnTile(row, col){
    if(!this.__placementExists(row, col)){
      throw new Error('Move has no tile at that position');
    }

    let placementIndex = this.__placementIndex(row, col);
    return this.placements.splice(placementIndex,1)[0].tile;
  }

  returnAllTiles(){
    return this.placments.splice(0).map(placement => {
      return placement.tile;
    });
  }

  __placementIndex(row, col){
    for(let i = 0; i < this.placements.length; i++){
      if(this.placements[i].hasCoords(row, col)){
        return i;
      }
    }
    return -1;
  }

  __placementExists(row, col){
    return this.__placementIndex(row, col) !== -1;
  }

}