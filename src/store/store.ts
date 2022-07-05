import { configureStore } from "@reduxjs/toolkit";
import rateReducer from "./rateReducer";
import convertorReducer from "./convertorReducer";
import currenciesReducer from "./currenciesReducer";

export const store = configureStore({
  reducer: {
    rate: rateReducer,
    convertor: convertorReducer,
    currencies: currenciesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
