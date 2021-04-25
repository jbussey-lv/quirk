import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import Tile, { TileProps, TileInterface, getFullTileSet, Status } from '../features/tile/Tile';
import { createSelector } from 'reselect';
import { v4 as uuidv4 } from 'uuid';
import shuffleArray from 'shuffle-array';
import shuffle from 'shuffle-array';
import { platform } from 'node:os';

const initialWidth = 12;
const initialHeight = 12;
const handSize = 6;

export enum MoveType {
  Normal = "normal",
  Trade = "trade"
}

export enum GameStatus {
  Setup = "setup",
  Ongoing = "ongoing",
  Over = "over"
}

interface PlacementInterface {
  tile: TileInterface;
  position: Position;
}

export interface Position {
  row: number;
  col: number;
}

interface RawPlayerInterface {
  id: string;
  name: string;
  hand: TileInterface[];
}

export interface PlayerInterface {
  id: string;
  name: string;
  hand: TileInterface[];
  moves: MoveInterface[];
  totalPoints: number;
  atBat: boolean;
}


export interface MoveInterface {
  placements: PlacementInterface[];
  points: number;
  type: MoveType|null;
}

const getNewMove = function(): MoveInterface {
  return {
    placements: [],
    points: 0,
    type: MoveType.Normal
  }
}

const getBlankGrid = function(rows: number, cols: number): (TileProps|null)[][]{
  return [...Array(rows)].map(e => Array(cols).fill(null));
}

const getInitialGrid = function(): (TileProps|null)[][]{
  return getBlankGrid(initialHeight, initialWidth);
}

const isCurrentMove = function(move: MoveInterface, moves: MoveInterface[]): boolean {
  return moves[moves.length - 1] === move;
}

const isMoveIllegal = (move: MoveInterface, grid: (TileProps|null)[][]): boolean => {
  return moveHasRepeats(move) ||
         moveHasNoPattern(move) || 
         gridIsDisjoint(grid);
}

const gridIsDisjoint = (grid: (TileProps|null)[][]): boolean => {
  
  let markGrid = grid.map((row: (TileProps | null)[]) => {
    return row.map((tile) => {
      return {marked: false, populated: !!tile};
    })
  })
  
  // [...Array(grid.length)].map(e => Array(grid[0].length).fill(false));
  // let regions = 0;
  // grid.forEach((cells, row) => {
  //   cells.forEach((cell, col) => {
  //     if(grid[row][col] !== null && markGrid[row][col] === false){
  //       regions += 1;
  //       visitCell(grid, markGrid);
  //     }
  //   })
  // })
  return false
}

const visitCell = (grid: (TileProps|null)[][], markGrid: (boolean)[][]): void => {

}

const moveHasRepeats = (move: MoveInterface): boolean => {
  let combos = move.placements.map(placement => {
    return placement.tile.color + "-" + placement.tile.shape;
  });

  let comboSet = new Set(combos);

  return comboSet.size < move.placements.length;
}

const moveHasNoPattern = (move: MoveInterface): boolean => {
  return getUniqueShapes(move).size > 1 &&
         getUniqueColors(move).size > 1;
}

const getUniqueShapes = (move: MoveInterface): Set<string> => {
  let vals = move.placements.map(placement => {
    return placement.tile.shape;
  });

  return new Set(vals);
}

const getUniqueColors = (move: MoveInterface): Set<string> => {
  let vals = move.placements.map(placement => {
    return placement.tile.color;
  });

  return new Set(vals);
}

const getPopulatedGrid = function(moves: MoveInterface[]): (TileProps|null)[][] {
 
  let grid = getInitialGrid();
  moves.forEach(move => {
    let currentMove = isCurrentMove(move, moves);
    let isIllegal = isMoveIllegal(move, grid);
    move.placements.forEach(placement => {
      let status = Status.Normal;
      if(currentMove){
        status = isIllegal ? Status.Illegal : Status.Active;
      }
      grid[placement.position.row][placement.position.col] = {
        ...placement.tile,
        dragable: currentMove,
        status: status
      }
    })
  });

  return grid;
}

interface GameInterface {
  players: RawPlayerInterface[];
  moves: MoveInterface[];
  bag: TileInterface[];
}

let initialState:GameInterface = {
  players: [],
  moves: [],
  bag: getFullTileSet()
}

function replenishAllHands(players:RawPlayerInterface[], bag:TileInterface[]){
  players.forEach(player => {
    replenishHand(player, bag);
  })
}

function replenishHand(player:RawPlayerInterface, bag:TileInterface[]){
  shuffle(bag);
  while(player.hand.length < handSize){
    let tile:TileInterface|undefined = bag.pop();
    if(tile){
      player.hand.push(tile);
    }
  }
}

function createNewPlayer(name:string, bag:TileInterface[]): RawPlayerInterface {
  return {name, hand: [], id: uuidv4()}
}

export const selectBag = (state: RootState) => state.game.bag;

export const selectPlayers = (state: RootState): PlayerInterface[] => {

  let players = state.game.players;
  let currentPlayer = selectCurrentPlayer(state);

  return players.map((player, playerIndex) => {
    let moves:MoveInterface[] = state.game.moves.filter((move, moveIndex) => {
      return moveIndex % players.length === playerIndex
    });
    let totalPoints = moves.reduce((memo, move) => memo + move.points, 0);
    let atBat = (currentPlayer !== null) && (currentPlayer.id === player.id);
    return {...player, moves, totalPoints, atBat}
  });
}

export const selectGrid = (state: RootState) => {
  return getPopulatedGrid(state.game.moves);
}


export const selectGameStatus = (state: RootState) => {
  return getGameStatus(state.game.moves);
}

const getGameStatus = (moves:MoveInterface[]) => {
  return moves.length === 0 ? GameStatus.Setup : GameStatus.Ongoing;
}

export const selectCurrentPlayer = (state: RootState): RawPlayerInterface|null => {

  let moves = state.game.moves;
  let players = state.game.players;

  return getCurrentPlayer(moves, players);
}

const getCurrentPlayer = (moves:MoveInterface[], players:RawPlayerInterface[]): RawPlayerInterface|null => {
  let gameStatus = getGameStatus(moves);
  if(gameStatus !== GameStatus.Ongoing || moves.length === 0){
    return null;
  }
  let currentPlayerIndex = (moves.length-1) % players.length;
  return players[currentPlayerIndex];
}

const getCurrentMove = (moves:MoveInterface[]): MoveInterface => {
  return moves[moves.length - 1];
}

const clearTile = (players: RawPlayerInterface[], moves: MoveInterface[], targetTile: TileInterface): void => {
    
    // remove from all moves
    moves.forEach(move => {
      move.placements = move.placements.filter(placement => {
        return placement.tile.id !== targetTile.id;
      });
    });

    // remove from all hands
    players.forEach(player => {
      player.hand = player.hand.filter(tile => {
        return tile.id !== targetTile.id;
      });
    });
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    addPlacement(state, action: PayloadAction<PlacementInterface>){

      clearTile(state.players, state.moves, action.payload.tile);

      // add it to the current move
      let move = getCurrentMove(state.moves);
      move.placements.push(action.payload);
    },
    removePlacement(state, action: PayloadAction<TileInterface>){

      clearTile(state.players, state.moves, action.payload);

      let currentPlayer = getCurrentPlayer(state.moves, state.players);
      currentPlayer?.hand.push(action.payload);
    },
    finishMove(state){
      let currentPlayer = getCurrentPlayer(state.moves, state.players);
      let currentMove = state.moves[state.moves.length - 1];
      currentMove.points = currentMove.placements.length;
      if(currentPlayer){
        replenishHand(currentPlayer, state.bag);
      }
      state.moves.push(getNewMove());
    },
    addPlayer(state, action: PayloadAction<string>){
      state.players.push(createNewPlayer(action.payload, state.bag));
    },
    removePlayer(state, action: PayloadAction<PlayerInterface>){
      state.players = state.players.filter(player => player.id !== action.payload.id);
    },
    startGame(state){
      replenishAllHands(state.players, state.bag);
      state.moves.push(getNewMove());
    },
    resetGame(state){
      state.moves = [];
      state.bag = getFullTileSet();
      state.players.forEach(player => {
        player.hand = [];
      });
      replenishAllHands(state.players, state.bag);
    }
  }
});


export const { addPlacement, removePlacement, finishMove, addPlayer, removePlayer, startGame, resetGame } = gameSlice.actions;

export default gameSlice.reducer;