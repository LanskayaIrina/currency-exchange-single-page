import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { CurrencyServerData } from "./services/currencyService";

type Nullable<T> = null | T;

export interface Currency {
  key: string;
  value: string;
}

const initialState = {
  usd: "",
  eur: "",
  date: "",
  baseCurrency: "",
  currencies: [] as Currency[],
  loading: false,
  error: null as Nullable<string>,
};

export type CurrenciesState = typeof initialState;

export const currenciesSlice = createSlice({
  name: "Currencies",
  initialState,
  reducers: {
    getCurrencies: (state: CurrenciesState) => {
      state.loading = true;
      state.error = null;
    },
    getCurrenciesSuccess: (
      state: CurrenciesState,
      action: PayloadAction<CurrencyServerData>
    ) => {
      state.loading = false;
      state.error = null;
      state.usd = action.payload.rates.USD;
      state.eur = action.payload.rates.EUR;
      state.date = action.payload.date;
      state.baseCurrency = action.payload.base;
    },
    getCurrenciesError: (
      state: CurrenciesState,
      action: PayloadAction<string>
    ) => {
      state.loading = false;
      state.error = action.payload;
      state.usd = "";
      state.eur = "";
      state.date = "";
      state.baseCurrency = "";
    },
    getCurrencySymbols: (state: CurrenciesState) => {
      state.loading = true;
      state.error = null;
    },
    getCurrencySymbolsSuccess: (
      state: CurrenciesState,
      action: PayloadAction<Currency[]>
    ) => {
      state.loading = false;
      state.error = null;
      state.currencies = action.payload;
    },
    getCurrencySymbolsError: (
      state: CurrenciesState,
      action: PayloadAction<string>
    ) => {
      state.loading = false;
      state.error = action.payload;
      state.currencies = [];
    },
    sendCurrenciesRequest: (state: CurrenciesState) => {
      state.loading = true;
    },
    setCurrencies: (
      state: CurrenciesState,
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

export const {
  getCurrencies,
  getCurrenciesSuccess,
  getCurrenciesError,
  getCurrencySymbols,
  getCurrencySymbolsSuccess,
  getCurrencySymbolsError,
  setCurrencies,
  sendCurrenciesRequest,
  setCurrenciesErrors,
} = currenciesSlice.actions;

export default currenciesSlice.reducer;
