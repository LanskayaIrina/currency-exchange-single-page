import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface rateState {
  base: string;
  firstValue: string;
  secondValue: string;
}

const initialState: rateState = {
  base: "",
  firstValue: "",
  secondValue: "",
};

export const rateSlice = createSlice({
  name: "rate",
  initialState,
  reducers: {
    setRate: (
      state,
      action: PayloadAction<{ base: string; firstValue: string }>
    ) => {
      state.base = action.payload.base;
      state.firstValue = action.payload.firstValue;
    },
  },
});

export const { setRate } = rateSlice.actions;

export default rateSlice.reducer;
