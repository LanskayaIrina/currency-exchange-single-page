import { configureStore } from "@reduxjs/toolkit";
import rateReducer from "./rateReducer";
import convertorReducer from "./convertorReducer";

export const store = configureStore({
  reducer: {
    rate: rateReducer,
    convertor: convertorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
