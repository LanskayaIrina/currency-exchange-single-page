import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ConvertorState {
  from: string;
  to: string;
  amount: string;
}

const initialState: ConvertorState = {
  from: "",
  to: "",
  amount: "1",
};

export const convertorSlice = createSlice({
  name: "convertor",
  initialState,
  reducers: {
    setValues: (
      state,
      action: PayloadAction<{ from: string; to: string; amount: string }>
    ) => {
      state.from = action.payload.from;
      state.to = action.payload.to;
      state.amount = action.payload.amount;
    },
  },
});

export const { setValues } = convertorSlice.actions;

export default convertorSlice.reducer;
