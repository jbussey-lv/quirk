import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Tile from "../tile/Tile";

interface Player {
  id: string;
  name: string;
  tiles: Tile[];
}

interface AddTiles {
  player: Player,
  tiles: Tile[]
}

interface AddTile {
  player: Player,
  tile: Tile
}

interface RemoveTile {
  player: Player,
  tile: Tile
}

function createNewPlayer(name:string): Player {
  return {name, tiles: [], id: uuidv4()}
}

function addTiles(state: Player[], targetPlayer: Player, tiles: Tile[]){
  state.forEach(player => {
    if(player.id === targetPlayer.id){
      player.tiles = player.tiles.concat(tiles);
    }
  })
}

function removeTile(state: Player[], targetPlayer: Player, targetTile: Tile){
  state.forEach(player => {
    if(player.id === targetPlayer.id){
      player.tiles = player.tiles.filter(tile => tile.id !== targetTile.id);
    }
  })
}

let initialState:Player[] = [];

export const playersSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    addPlayer(state, action: PayloadAction<string>){
      state.push(createNewPlayer(action.payload));
    },
    removePlayer(state, action: PayloadAction<Player>){
      state = state.filter(player => player.id !== action.payload.id);
    },
    addTiles(state, action: PayloadAction<AddTiles>){
      let { player, tiles } = action.payload;
      addTiles(state, player, tiles);
    },
    addTile(state, action: PayloadAction<AddTile>){
      let { player, tile } = action.payload;
      addTiles(state, player, [tile]);
    },
    removeTile(state, action: PayloadAction<AddTile>){
      let { player, tile } = action.payload;
      removeTile(state, player, tile);
    }
  }
});

export default playersSlice.reducer;

function uuidv4(): string {
  throw new Error("Function not implemented.");
}
