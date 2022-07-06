import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setBase, setRate } from "../../store/rateReducer";
import { useHttp } from "../../hooks/http";
import { RootState } from "../../store/store";

import { LoadingSpinner } from "../../UI/LoadingSpinner";
import { CustomizedSnackbars } from "../../UI/CustomizedSnackbars";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Autocomplete } from "@mui/material";
import "./CurrentRate.scss";

export const CurrenRate = () => {
  const [baseCurrencyInputValue, setBaseCurrencyInputValue] = useState("");
  const [isOpenErrorSnackbar, setIsOpenErrorSnackbar] = useState(false);

  const { base, firstValue, secondValue } = useSelector(
    (state: RootState) => state.rate
  );
  const { currencies, loading } = useSelector(
    (state: RootState) => state.currencies
  );

  const dispatch = useDispatch();

  const { data, isLoading, error: rateError, sendRequest } = useHttp();

  const baseFromStorage = localStorage.getItem("base");

  useEffect(() => {
    if (data && !isLoading && !rateError) {
      dispatch(
        setRate({
          base,
          firstValue: data.rates["USD"],
          secondValue: data.rates["EUR"],
        })
      );
    }
  }, [data]);

  useEffect(() => {
    if (baseFromStorage) {
      dispatch(setBase({ base: baseFromStorage }));
      setBaseCurrencyInputValue(baseFromStorage);
    } else {
      setBaseCurrencyInputValue(base);
    }
  }, [sendRequest]);

  useEffect(() => {
    if (baseCurrencyInputValue) {
      sendRequest(
        `https://api.apilayer.com/exchangerates_data/latest?symbols=${[
          baseCurrencyInputValue,
          "EUR",
          "USD",
        ]}&base=${baseCurrencyInputValue}`
      );
    }
  }, [baseCurrencyInputValue, sendRequest]);

  useEffect(() => {
    if (rateError) {
      setIsOpenErrorSnackbar(true);
    }
  }, [rateError]);

  const handleChange = (event: { label: string; key: string }) => {
    dispatch(setBase({ base: event.key }));
    setBaseCurrencyInputValue(event.key);
    localStorage.setItem("base", event.key);
  };

  const currentCurrency = currencies.find(
    (c) => c.key === baseCurrencyInputValue
  );
  const autocompleteValue = {
    label: currentCurrency?.value || "",
    key: currentCurrency?.key || "",
  };

  return (
    <>
      {isOpenErrorSnackbar && (
        <CustomizedSnackbars isOpen={isOpenErrorSnackbar} message={rateError} />
      )}
      {(!loading || !isLoading) && !!currencies?.length && (
        <Box sx={{ minWidth: 120 }}>
          <Autocomplete
            className="custom-autocomplete"
            disablePortal
            id="custom-autocomplete"
            value={autocompleteValue}
            onChange={(event, newValue) => {
              if (newValue) {
                handleChange(newValue);
              }
            }}
            isOptionEqualToValue={(option, value) => {
              return option.key === value.key;
            }}
            options={currencies.map((c) => ({ label: c.value, key: c.key }))}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Currencies" />
            )}
          />
          <Box className="rate-textField-container" mt={2}>
            <TextField
              id="USD"
              label="USD"
              variant="outlined"
              value={firstValue}
              disabled
            />
          </Box>
          <Box mt={2} className="rate-textField-container">
            <TextField
              id="EUR"
              label="EUR"
              value={secondValue}
              variant="outlined"
              disabled
            />
          </Box>
        </Box>
      )}
      {(loading || isLoading) && (
        <Box
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <LoadingSpinner />
        </Box>
      )}
    </>
  );
};
