import React, { Suspense } from "react";
import { Layout } from "./components/Layout/Layout";
import { Route, Routes } from "react-router-dom";

import "./App.scss";

const CurrencyConvertor = React.lazy(() =>
  import("./pages/CurrencyConverter/CurrencyConverter").then((module) => ({
    default: module.CurrencyConverter,
  }))
);

const NoFound = React.lazy(() =>
  import("./pages/NoFoundPage/NoFoundPage").then((module) => ({
    default: module.NoFoundPage,
  }))
);

function App() {
  return (
    <Layout>
      <Suspense fallback={<div className="centered">loading</div>}>
        <Routes>
          <Route path="/" element={<CurrencyConvertor />} />
          <Route path="*" element={<NoFound />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
