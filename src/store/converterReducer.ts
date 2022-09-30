import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type Nullable<T> = null | T;

// export type ConverterData = {
//   from: string;
//   to: string;
//   amount: string;
// };

export type ConverterData = {
  firstSelect: { type: string; value: string };
  secondSelect: { type: string; value: string };
  amount: string;
};

const initialState = {
  firstSelect: { type: "", value: "" },
  secondSelect: { type: "", value: "" },
  amount: "1",
  result: "",
  loading: false,
  error: null as Nullable<string>,
};

export type ConverterState = typeof initialState;

export const converterSlice = createSlice({
  name: "converter",
  initialState,
  reducers: {
    getCurrencyValues: (
      state: ConverterState,
      action: PayloadAction<ConverterData>
    ) => {
      state.loading = true;
      state.error = null;
      state.firstSelect = action.payload.firstSelect;
      state.secondSelect = action.payload.secondSelect;
      state.amount = action.payload.amount;
    },
    getCurrencyValuesSuccess: (
      state: ConverterState,
      action: PayloadAction<string>
    ) => {
      state.loading = false;
      state.error = null;
      state.result = action.payload;
    },
    getCurrencyValuesError: (
      state: ConverterState,
      action: PayloadAction<string>
    ) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getCurrencyValues,
  getCurrencyValuesSuccess,
  getCurrencyValuesError,
} = converterSlice.actions;

export default converterSlice.reducer;
