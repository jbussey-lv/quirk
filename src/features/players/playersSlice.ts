import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';
import { RootState } from "../../app/store";
import { TilePrimitive } from "../tile/Tile";

export const HAND_SIZE = 6;

export interface PlayerPrimitive {
  id: string;
  name: string;
  tiles: TilePrimitive[];
}

interface AddTiles {
  player: PlayerPrimitive,
  tiles: TilePrimitive[]
}

interface AddTile {
  player: PlayerPrimitive,
  tile: TilePrimitive
}

interface RemoveTile {
  player: PlayerPrimitive,
  tile: TilePrimitive
}

function createNewPlayer(name:string): PlayerPrimitive {
  return {name, tiles: [], id: uuidv4()}
}

function addTilesHelper(state: PlayerPrimitive[], targetPlayer: PlayerPrimitive, tiles: TilePrimitive[]){
  state.forEach(player => {
    if(player.id === targetPlayer.id){
      player.tiles = player.tiles.concat(tiles);
    }
  })
}

function removeTileHelper(players: PlayerPrimitive[], targetPlayer: PlayerPrimitive, targetTile: TilePrimitive){
  players.forEach(player => {
    if(player.id === targetPlayer.id){
      player.tiles = player.tiles.filter(tile => tile.id !== targetTile.id);
    }
  })
}

let initialState:PlayerPrimitive[] = [];

export const playersSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    addPlayer(state, action: PayloadAction<string>){
      state.push(createNewPlayer(action.payload));
    },
    removePlayer(players, action: PayloadAction<PlayerPrimitive>){
      let index = null;
      players.forEach((player, i) => {
        if(player.id === action.payload.id){
          index = i;
        }
      })
      if(index !== null){
        players.splice(index, 1);
      }
    },
    addTile(state, action: PayloadAction<AddTile>){
      let { player, tile } = action.payload;
      addTilesHelper(state, player, [tile]);
    },
    addTiles(state, action: PayloadAction<AddTiles>){
      let { player, tiles } = action.payload;
      addTilesHelper(state, player, tiles);
    },
    addTilesToAll(players, action: PayloadAction<TilePrimitive[]>){
      let allTiles = action.payload;
      players.forEach((player:PlayerPrimitive) => {
        let tiles = allTiles.splice(0, HAND_SIZE);
        addTilesHelper(players, player, tiles);
      })
    },
    removeTile(players, action: PayloadAction<RemoveTile>){
      let { player, tile } = action.payload;
      removeTileHelper(players, player, tile);
    },
    reset(state){
      state.forEach(player => {
        player.tiles = [];
      })
    }
  }
});

export const selectPlayers = (state: RootState) => {
  return state.players.map((player, playerIndex) => {
    return {
      ...player,
      moves: [],
      totalPoints: 0,
      atBat: getAtBat(playerIndex, state),

    }
  })
}

const getAtBat = (playerIndex: number, state: RootState) => {
  if(state.moves.length === 0){return false;}
  return (state.moves.length - 1) % state.players.length === playerIndex;
}

export const selectCurrentPlayer = (state: RootState) => {
  let { moves, players } = state;
  let currentPlayerIndex = (moves.length-1) % players.length;
  return players[currentPlayerIndex];
}

export const { addPlayer, removePlayer, addTile, addTiles, addTilesToAll, removeTile, reset } = playersSlice.actions;

export default playersSlice.reducer;
