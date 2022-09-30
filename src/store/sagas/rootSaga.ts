import { all, fork } from "redux-saga/effects";
import { currencySagas } from "./currencySaga";
import { convertorSagas } from "./converterSaga";

export default function* rootSaga() {
  yield all([fork(currencySagas), fork(convertorSagas)]);
}
