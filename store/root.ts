import { combineReducers, createStore } from "@reduxjs/toolkit";
import checkTokenSlice, { checkTokenInitialStateInterface } from "./slice/checkTokenSlice";
import countSlice, { initialStateInterface } from "./slice/counterSlice";

export interface RootState {
  countSlice: initialStateInterface;
  checkTokenSlice: checkTokenInitialStateInterface;
}

const rootReducer = combineReducers({
  countSlice: countSlice,
  checkTokenSlice: checkTokenSlice,
});

export default rootReducer;

