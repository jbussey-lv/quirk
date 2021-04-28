
import shuffle from 'shuffle-array';
import Tile, {Shape, Color} from "./Tile";

const REPEATS = 3;

export default class Bag {

  tiles: Tile[];

  constructor() {
    this.tiles = this._getFullTileSet();
  }

  reset(): void {
    this.tiles = this._getFullTileSet();
  }

  drawTiles(num: number): Tile[] {
    shuffle(this.tiles);
    let response: Tile[] = [];
    while(response.length < num){
      let tile:Tile|undefined = this.tiles.pop();
      if(tile){
        response.push(tile);
      }
    }
    return response;
  }

  tradeTiles(tiles: Tile[]){
    let response = this.drawTiles(tiles.length);
    this._addTiles(tiles);
    return response;
  }

  _addTiles(tiles: Tile[]): void {
    this.tiles = this.tiles.concat(tiles);
  }

  _getFullTileSet(): Tile[] {
    let tileSet: Tile[] = [];
    let id = 0;
    for (let colorVal in Color) {
      for (let shapeVal in Shape) {
        for(let i = 0; i < REPEATS; i++){
          id++;
          let color:Color = Color[colorVal as keyof typeof Color];
          let shape:Shape = Shape[shapeVal as keyof typeof Shape];
          tileSet.push(new Tile(id, shape, color));
        }
      }
    }
  
    return tileSet;
  }
}