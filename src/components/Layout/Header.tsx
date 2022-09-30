import { FC, useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { RootState } from "../../store/store";
import { getCurrencies } from "../../store/currenciesReducer";
import { CustomizedSnackbars } from "../../UI/CustomizedSnackbars";

import "./Header.scss";

export const Header: FC = () => {
  const { usd, eur, date, baseCurrency, loading, error } = useAppSelector(
    (state: RootState) => state.currencies
  );
  const dispatch = useAppDispatch();
  const [isOpenErrorSnackbar, setIsOpenErrorSnackbar] = useState(false);

  useEffect(() => {
    dispatch(getCurrencies());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      setIsOpenErrorSnackbar(true);
    }
  }, [error]);

  return (
    <header className="header">
      <h2 className="logo">Currency exchange</h2>
      {loading && <span className="currency-value">Loading...</span>}
      {!loading && !error && (
        <div>
          <span className="currency-value">Today: {date}</span>
          <div className="currency-container">
            <span className="currency-value">
              {baseCurrency}: 1 USD: {usd}
            </span>
            <span className="currency-value">
              {baseCurrency}: 1 EUR: {eur}
            </span>
          </div>
        </div>
      )}

      {isOpenErrorSnackbar && (
        <CustomizedSnackbars
          isOpen={isOpenErrorSnackbar}
          message={error as string}
        />
      )}
    </header>
  );
};
