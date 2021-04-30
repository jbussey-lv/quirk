import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import shuffle from "shuffle-array";
import { Color, Shape, TilePrimitive } from "../tile/Tile";

const repeats = 3;

function getFullTileSet(): TilePrimitive[] {
  let tileSet: TilePrimitive[] = [];
  let id = 0;
  for (let colorVal in Color) {
    for (let shapeVal in Shape) {
      for(let i = 0; i < repeats; i++){
        id++;
        let color:Color = Color[colorVal as keyof typeof Color];
        let shape:Shape = Shape[shapeVal as keyof typeof Shape];
        tileSet.push({color, shape, id})
      }
    }
  }
  return tileSet;
}

function addTilesHelper(state:State, newTiles: TilePrimitive[]){
  state.tiles = state.tiles.concat(newTiles);
  shuffle(state.tiles);
}

interface State {
  tiles: TilePrimitive[];
}

const initialState:State = {
  tiles: shuffle(getFullTileSet())
}

export const bagSlice = createSlice({
  name: 'bag',
  initialState,
  reducers: {
    addTiles(state, action: PayloadAction<TilePrimitive[]>){
      addTilesHelper(state, action.payload);
    },
    removeTiles(state, action: PayloadAction<TilePrimitive[]>){
      let targetIds = action.payload.map(tile => tile.id);
      state.tiles = state.tiles.filter((tile:TilePrimitive) => !targetIds.includes(tile.id));
    },
    reset(state){
      state.tiles = [];
      addTilesHelper(state, getFullTileSet());
    }
  }
});


export const { addTiles, removeTiles, reset } = bagSlice.actions;

export default bagSlice.reducer;