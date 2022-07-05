import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type Nullable<T> = null | T;

export interface Currency {
  key: string;
  value: string;
}

export interface currenciesState {
  currencies: Currency[];
  loading: boolean;
  error: null | Nullable<string>;
}

const initialState: currenciesState = {
  currencies: [],
  loading: false,
  error: null,
};

export const currenciesSlice = createSlice({
  name: "Currencies",
  initialState,
  reducers: {
    sendCurrenciesRequest: (state) => {
      state.loading = true;
    },
    setCurrencies: (
      state,
      action: PayloadAction<{ currencies: Currency[] }>
    ) => {
      state.currencies = action.payload.currencies;
      state.loading = false;
    },
    setCurrenciesErrors: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setCurrencies, sendCurrenciesRequest, setCurrenciesErrors } =
  currenciesSlice.actions;

export default currenciesSlice.reducer;
