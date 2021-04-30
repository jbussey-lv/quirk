import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Placement } from "../Board/boardSlice";
import Tile, { TilePrimitive } from "../tile/Tile";

export interface Move {
  id: number;
  placements: Placement[];
  points: number;
}

const initialState:Move[] = [];

export function selectMoves(state:RootState): Move[]{
  return state.moves;
}

export function selectCurrentMove(state:RootState): Move {
  return state.moves[state.moves.length - 1];
}

function getEmptyMove(id:number): Move{
  return {id, placements: [], points: 0};
}

function appendNewMove(moves: Move[]){
  moves.push(getEmptyMove(moves.length));
}

export const movesSlice = createSlice({
  name: 'moves',
  initialState,
  reducers: {
    start(moves){
      appendNewMove(moves);
    },
    reset(moves){
      moves.length = 0;
    },
    addTile(moves, action: PayloadAction<Placement>){
      let currentMove = moves[moves.length - 1]
      currentMove.placements.push(action.payload);
    },
    removeTile(moves, action: PayloadAction<TilePrimitive>){
      let currentMove = moves[moves.length - 1]
      currentMove.placements = currentMove.placements.filter(
        placement => placement.tile.id !== action.payload.id
      );
    },
    finishMove(moves){
      appendNewMove(moves);
    }
  }
});


export const { start, reset, addTile, removeTile, finishMove } = movesSlice.actions;

export default movesSlice.reducer;