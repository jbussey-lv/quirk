import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { TileInterface, getFullTileSet } from '../features/tile/Tile';
import { createSelector } from 'reselect';
import { v4 as uuidv4 } from 'uuid';
import shuffleArray from 'shuffle-array';
import shuffle from 'shuffle-array';

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

interface Placement {
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
  placements: Placement[];
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

const getBlankGrid = function(rows: number, cols: number): (TileInterface|null)[][]{
  return [...Array(rows)].map(e => Array(cols).fill(null));
}

const getInitialGrid = function(): (TileInterface|null)[][]{
  return getBlankGrid(initialHeight, initialWidth);
}

const getPopulatedGrid = function(moves: MoveInterface[]): (TileInterface|null)[][] {

  let grid = getInitialGrid();
  moves.forEach(move => {
    move.placements.forEach(placement => {
      grid[placement.position.row][placement.position.col] = placement.tile;
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

// Check if One or More players have been created
// if more than more than 2 players, then show the start button.
function playerCheck(players: number)
{
  // the current func. allows to add many players, we check for a value greater than 2.
  if(players >= 2){
    (document.getElementById('startGame') as HTMLInputElement).style.display = 'initial';
  }else{
    (document.getElementById('startGame') as HTMLInputElement).style.display = 'none';
  }
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


export const gameSlice = createSlice({
  name: 'game',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addPlacement(state, action: PayloadAction<Placement>){

      // add it to the current move
      state.moves[state.moves.length - 1].placements.push(action.payload);

      // remove it from the current player's hand
      let currentPlayer = getCurrentPlayer(state.moves, state.players);
      if(currentPlayer){
        currentPlayer.hand = currentPlayer?.hand.filter(tile => tile.id !== action.payload.tile.id);
      }
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
      playerCheck(state.players.length);
    },
    removePlayer(state, action: PayloadAction<PlayerInterface>){
      state.players = state.players.filter(player => player.id !== action.payload.id);
      playerCheck(state.players.length);
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


export const { addPlacement, finishMove, addPlayer, removePlayer, startGame, resetGame } = gameSlice.actions;

export default gameSlice.reducer;