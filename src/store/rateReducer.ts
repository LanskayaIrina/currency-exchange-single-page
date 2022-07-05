import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface rateState {
  base: string;
  firstValue: string;
  secondValue: string;
}

const initialState: rateState = {
  base: "USD",
  firstValue: "",
  secondValue: "",
};

export const rateSlice = createSlice({
  name: "rate",
  initialState,
  reducers: {
    setBase: (state, action: PayloadAction<{ base: string }>) => {
      state.base = action.payload.base;
    },
    setRate: (
      state,
      action: PayloadAction<{
        base: string;
        firstValue: string;
        secondValue: string;
      }>
    ) => {
      state.firstValue = action.payload.firstValue;
      state.secondValue = action.payload.secondValue;
    },
  },
});

export const { setBase, setRate } = rateSlice.actions;

export default rateSlice.reducer;
