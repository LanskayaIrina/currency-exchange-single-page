import { takeLatest, call, put, all } from "redux-saga/effects";

import {
  getCurrencies,
  getCurrenciesSuccess,
  getCurrenciesError,
  getCurrencySymbols,
  getCurrencySymbolsSuccess,
  getCurrencySymbolsError,
  Currency,
} from "../currenciesReducer";

import {
  CurrencyServerData,
  getCurrencyData,
  getCurrencySymbolsData,
} from "../services/currencyService";

function* requestCurrencySaga() {
  try {
    const res: CurrencyServerData = yield call(getCurrencyData);

    yield put(getCurrenciesSuccess(res));
  } catch (e) {
    yield put(
      getCurrenciesError("Error, something went wrong with data currency")
    );
  }
}

function* requestCurrencySymbolsSaga() {
  try {
    const res: Currency[] = yield call(getCurrencySymbolsData);

    yield put(getCurrencySymbolsSuccess(res));
  } catch (e) {
    yield put(
      getCurrencySymbolsError(
        "Error, something went wrong with data currency symbols"
      )
    );
  }
}

export const fetchCurrencySub = () => {
  return takeLatest(getCurrencies, requestCurrencySaga);
};

export const fetchCurrencySymbolsSub = () => {
  return takeLatest(getCurrencySymbols, requestCurrencySymbolsSaga);
};

export function* currencySagas() {
  yield all([fetchCurrencySub(), fetchCurrencySymbolsSub()]);
}
