import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import shuffle from "shuffle-array";
import TileInterface, { Color, Shape } from "../tile/Tile";

const repeats = 3;

function getFullTileSet(): TileInterface[] {
  let tileSet: TileInterface[] = [];
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

function addTiles(state: TileInterface[], tiles: TileInterface[]){
  shuffle(state);
  state = state.concat(tiles);
}

export const bagSlice = createSlice({
  name: 'bag',
  initialState: [],
  reducers: {
    addTiles(state, action: PayloadAction<TileInterface[]>){
      addTiles(state, action.payload);
    },
    removeTiles(state, action: PayloadAction<TileInterface[]>){
      let targetIds = action.payload.map(tile => tile.id);
      state = state.filter((tile:TileInterface) => !targetIds.includes(tile.id));
    },
    reset(state){
      state = [];
      addTiles(state, getFullTileSet());
    }
  }
});

export default bagSlice.reducer;