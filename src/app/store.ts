import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import filterSlice from "../features/games/filterSlice";
//import counterReducer from "../features/counter/counterSlice";
import gameReducer from "../features/games/gameSlice";
import urlReducer from "../features/games/urlSlice";
import filterReducer from "../features/games/filterSlice";

export const store = configureStore({
  reducer: {
    //  counter: counterReducer,
    game: gameReducer,
    url: urlReducer,
    filter: filterReducer,
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
