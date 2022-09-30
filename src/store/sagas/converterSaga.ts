import { takeLatest, call, put, all } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";

import {
  getCurrencyValues,
  getCurrencyValuesSuccess,
  getCurrencyValuesError,
  ConverterData,
} from "../converterReducer";
import { getConverterData } from "../services/converterService";

function* requestConverterSaga(action: PayloadAction<ConverterData>) {
  try {
    const res: string = yield call(getConverterData, action.payload);

    yield put(getCurrencyValuesSuccess(res));
  } catch (e) {
    yield put(
      getCurrencyValuesError("Error, something went wrong with convertor")
    );
  }
}

export const fetchConverterSub = () => {
  return takeLatest(getCurrencyValues, requestConverterSaga);
};

export function* convertorSagas() {
  yield all([fetchConverterSub()]);
}
