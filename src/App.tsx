import React, { Suspense, useEffect } from "react";
import { Layout } from "./Components/Layout/Layout";
import { Route, Routes } from "react-router-dom";
import { useHttp } from "./hooks/http";
import { useDispatch } from "react-redux";
import {
  setCurrencies,
  sendCurrenciesRequest,
  setCurrenciesErrors,
} from "./store/currenciesReducer";

import "./App.scss";

const CurrentRate = React.lazy(() =>
  import("./Pages/CurrentRate/CurrenRate").then((module) => ({
    default: module.CurrenRate,
  }))
);

const CurrencyConvertor = React.lazy(() =>
  import("./Pages/CurrencyConverter/CurrencyConverter").then((module) => ({
    default: module.CurrencyConverter,
  }))
);

const NoFound = React.lazy(() =>
  import("./Pages/NoFoundPage/NoFoundPage").then((module) => ({
    default: module.NoFoundPage,
  }))
);

function App() {
  const dispatch = useDispatch();
  const { data, isLoading, error, sendRequest } = useHttp();

  useEffect(() => {
    sendRequest("https://api.apilayer.com/exchangerates_data/symbols");
  }, []);

  useEffect(() => {
    if (isLoading) {
      dispatch(sendCurrenciesRequest());
    }

    if (error) {
      dispatch(setCurrenciesErrors(error));
    }
  }, [isLoading, error]);

  useEffect(() => {
    if (data) {
      let currencies: any[] = [];
      for (let [key, value] of Object.entries(data.symbols)) {
        currencies = [...currencies, { key, value }];
      }
      dispatch(setCurrencies({ currencies: currencies }));
    }
  }, [data]);

  return (
    <Layout>
      <Suspense fallback={<div className="centered">loading</div>}>
        <Routes>
          <Route path="/" element={<CurrentRate />} />

          <Route path="/currency-converter" element={<CurrencyConvertor />} />

          <Route path="*" element={<NoFound />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
