import { configureStore } from "@reduxjs/toolkit";
import createSageMiddleware from "redux-saga";
import rateReducer from "./rateReducer";
import convertorReducer from "./converterReducer";
import currenciesReducer from "./currenciesReducer";

import rootSaga from "./sagas/rootSaga";

const sagaMiddleware = createSageMiddleware();

const store = configureStore({
  reducer: {
    rate: rateReducer,
    convertor: convertorReducer,
    currencies: currenciesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      thunk: false,
    }).concat(sagaMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

sagaMiddleware.run(rootSaga);

export default store;
