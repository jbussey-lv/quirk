
import Tile from "./Tile";
import Line from "./Line";

type MarkValue = {
  marked: boolean;
  populated: boolean;
}

type Position = {
  row: number;
  col: number;
}

type Placement = {
  tile: Tile;
  position: Position;
}

export default class Grid {

  _tiles: Tile[][];

  constructor(height: number, width: number) {
    this._tiles = this._getBlankGrid(height, width);
  }

  addPlacement(placement: Placement): void {
    this._tiles[placement.position.row][placement.position.col] = placement.tile;
  }

  addPlacements(placements: Placement[]){
    placements.forEach(this.addPlacement);
  }

  isIllegal(): boolean {
    return this._isDisjoint() ||
           this._containsIllegalLines();
  }

  _getBlankGrid(height: number, width: number) {
    return [...Array(height)].map(e => Array(width).fill(null));
  }

  _isDisjoint(): boolean {
  
    let markGrid: MarkValue[][] = this._getMarkGrid()
    let regions = 0;
    markGrid.forEach((cells, row) => {
      cells.forEach((cell, col) => {
        if(cell.populated && !cell.marked){
          regions += 1;
          this._visitCell(markGrid, {row, col});
        }
      })
    })
    
    return regions > 1;
  }

  _getMarkGrid(): MarkValue[][] {
    return this._tiles.map((row: (Tile | null)[]) => {
      return row.map(tile => {
        return {marked: false, populated: tile !== null};
      })
    })
  }
  
  _visitCell(markGrid: MarkValue[][], position: Position): void {
    let markGridCell = markGrid[position.row][position.col];
    if(!markGridCell.marked && markGridCell.populated){
      markGridCell.marked = true;
      this._getNeighborPositions(markGrid, position).forEach(neighborPosition => {
        this._visitCell(markGrid, neighborPosition);
      });
    }
  }
  
  _getNeighborPositions(markGrid:MarkValue[][], position:Position): Position[] {
    let possible = [
      {row: position.row-1, col: position.col},
      {row: position.row+1, col: position.col},
      {row: position.row, col: position.col-1},
      {row: position.row, col: position.col+1}
    ];
  
    return possible.filter(position => {
      return position.row >= 0 &&
             position.row < markGrid.length &&
             position.col >= 0 &&
             position.col < markGrid[0].length
    });
  }

  _containsIllegalLines(): boolean {
    let response = false;
    this._getLines().forEach((line: Line): void => {
      response = response || line.isIllegal();
    });
    return response;
  }

  _getLines(): Line[] {
    let lines: Line[] = [];
    this._getStrips().forEach(strip => {
      lines = lines.concat(this._stripToLines(strip));
    });
    return lines;
  }

  _getStrips(): (Tile|null)[][] {
    let rowStrips = [...this._tiles];
    let colStrips = this._tiles[0].map((tile, col) => {
      return this._tiles.map((tiles, row) => {
        return tiles[col];
      })
    })
    return rowStrips.concat(colStrips);
  }

  _stripToLines(strip: (Tile|null)[]): Line[] {
    let rawLines: Tile[][] = [];
    let inProgress:boolean = false;

    strip.forEach(cell => {
      if(!inProgress && cell !== null){
        rawLines.push([]);
        inProgress = true;
      } else if (inProgress && cell === null){
        inProgress = false;
      }

      if(cell !== null){
        let currentLine = rawLines[rawLines.length - 1];
        currentLine.push(cell);
      }
    })

    return rawLines.filter(rawLine => rawLine.length > 1)
                   .map(rawLine => new Line(rawLine));
  }

}