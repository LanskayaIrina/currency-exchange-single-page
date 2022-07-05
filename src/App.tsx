import React, { Suspense } from "react";
import "./App.scss";
import { Layout } from "./Components/Layout/Layout";
import { Route, Routes } from "react-router-dom";

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

function App() {
  return (
    <>
      <Layout>
        <Suspense fallback={<div className="centered">loading</div>}>
          <Routes>
            <Route path="/" element={<CurrentRate />} />

            <Route path="/currency-converter" element={<CurrencyConvertor />} />

            <Route path="*">{/*<NoFound />*/}</Route>
          </Routes>
        </Suspense>
      </Layout>
    </>
  );
}

export default App;
