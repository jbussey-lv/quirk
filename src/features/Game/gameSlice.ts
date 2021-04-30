import { AppThunk } from '../../app/store';
import { createSelector } from 'reselect';
import { removeTiles, reset as resetBag } from '../Bag/bagSlice'
import { Move, selectMoves, start as startMoves, reset as resetMoves } from '../Moves/movesSlice';
import { PlayerPrimitive, selectPlayers, addTilesToAll, reset as resetPlayers, HAND_SIZE } from '../Players/playersSlice';

export enum Status {
  Setup = "setup",
  Ongoing = "ongoing",
  Done = "done"
}

export const selectCanStartGame = createSelector(
  selectPlayers,
  players => players.length > 0
)

export const selectStatus = createSelector(
  selectMoves,
  selectPlayers,
  (moves: Move[], players: PlayerPrimitive[]): Status => {
    let tilesRemain = players.reduce(
      (memo, player) => memo || player.tiles.length > 0,
      false
    )
    if(moves.length === 0){
      return Status.Setup;
    } else if (tilesRemain){
      return Status.Ongoing;
    } else {
      return Status.Done;
    }
  }
);

export const startGame = (): AppThunk => (
  dispatch, getState
) => {
  // add tiles to all players
  let { bag, players } = getState();
  let allTiles = [...bag.tiles]
  let extracedTiles = allTiles.splice(0, players.length * HAND_SIZE);
  dispatch(addTilesToAll([...extracedTiles]));  

  // remove tiles from bag
  dispatch(removeTiles([...extracedTiles]));

  dispatch(startMoves());
  // TODO: also start players
};

export const resetGame = (): AppThunk => (
  dispatch
) => {
  dispatch(resetPlayers());
  dispatch(resetBag());
  dispatch(resetMoves());
};