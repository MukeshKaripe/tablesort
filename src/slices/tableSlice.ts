import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL
interface ExampleState {
    [x: string]: any;
    value: number;
  }
const initialState:ExampleState = {
    value: 0,
  };
export const getData = createSlice({
    name: 'getData',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        }, decrement: (state) => {
            state.value -= 1;
        },
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload;
          },
    }
});
export const { increment, decrement, incrementByAmount } = getData.actions;
export default getData.reducer;