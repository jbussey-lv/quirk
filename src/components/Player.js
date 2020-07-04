class Player {

  constructor(name){
    this.name = name;
  }

  getMoves(){
    return [];
  }

  getPoints(){
    this.getMoves().reduce(
      (acc, move) => acc + move.getPoints(), 
      0
    );
  }
}