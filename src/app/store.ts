import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import playersReducer from '../features/Players/playersSlice';
import movesReducer from '../features/Moves/movesSlice';
import bagReducer from '../features/Bag/bagSlice';

export const store = configureStore({
  reducer: {
    players: playersReducer,
    moves: movesReducer,
    bag: bagReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;