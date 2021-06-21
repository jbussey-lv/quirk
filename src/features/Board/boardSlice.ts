import { AppThunk } from '../../app/store';
import { createSelector } from 'reselect';
import { selectMoves, Move } from '../Moves/movesSlice';
import { addTile as addTileToPlayer, removeTile as removeTileFromPlayer, selectCurrentPlayer } from '../Players/playersSlice'
import { addTile as addTileToMoves, removeTile as removeTileFromMoves } from '../Moves/movesSlice'
import Tile, { TilePrimitive, TileProps, Status as TileStatus } from '../tile/Tile';

const GRID_WIDTH = 16;
const GRID_HEIGHT = 16;

export interface Placement {
  tile: TilePrimitive;
  position: Position;
}

export interface Position {
  row: number;
  col: number;
}

function getEmptyGrid(): (TileProps|null)[][]{
  return [...Array(GRID_HEIGHT)].map(e => Array(GRID_WIDTH).fill(null));
}

export const selectGrid = createSelector(
  selectMoves,
  (moves:Move[]): (TileProps|null)[][] => {
    let grid = getEmptyGrid();
    moves.forEach(move => {
      move.placements.forEach(placement => {
        let tileProps = {
          ...placement.tile,
          draggable: false,
          status: TileStatus.Active
        }
        grid[placement.position.row][placement.position.col] = tileProps;
      })
    });
    return grid;
  }
)

export const addTile = (placement: Placement): AppThunk => (
  dispatch,
  getState
) => {
  let currentPlayer = selectCurrentPlayer(getState());
  dispatch(removeTileFromPlayer({
    player: currentPlayer,
    tile: placement.tile
  }));
  dispatch(addTileToMoves(placement));
};

export const removeTile = (tile: TilePrimitive): AppThunk => (
  dispatch, getState
) => {
  let currentPlayer = selectCurrentPlayer(getState());
  dispatch(removeTileFromMoves(tile));
  dispatch(addTileToPlayer({
    player: currentPlayer,
    tile: tile
  }));
};
