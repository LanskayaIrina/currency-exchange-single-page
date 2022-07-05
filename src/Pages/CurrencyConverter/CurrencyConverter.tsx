import { SyntheticEvent, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { RootState } from "../../store/store";
import { setValues } from "../../store/convertorReducer";
import { useHttp } from "../../hooks/http";

import { LoadingSpinner } from "../../UI/LoadingSpinner";
import { CustomizedSnackbars } from "../../UI/CustomizedSnackbars";

import Box from "@mui/material/Box";
import { Autocomplete } from "@mui/material";
import TextField from "@mui/material/TextField";
import "./CurrencyConverter.scss";

interface CurrencyItem {
  label: string;
  key: string;
}

const initialState = {
  from: "",
  to: "",
  amount: "1",
};

type InputValue = typeof initialState;

export const CurrencyConverter = () => {
  const [state, setState] = useState<InputValue>(initialState);
  const [isOpenErrorSnackbar, setIsOpenErrorSnackbar] = useState(false);
  const [amountInputError, setAmountInputError] = useState("");

  const { from, to, amount } = useSelector(
    (state: RootState) => state.convertor
  );

  const {
    currencies,
    loading: currenciesLoading,
    error: currenciesError,
  } = useSelector((state: RootState) => state.currencies);

  const dispatch = useDispatch();

  const {
    data,
    isLoading: convertorLoading,
    error: convertorError,
    sendRequest,
  } = useHttp();

  const currencyForm = localStorage.getItem("from");
  const currencyTo = localStorage.getItem("to");

  useEffect(() => {
    dispatch(
      setValues({ from: state.from, to: state.to, amount: state.amount })
    );

    if (from === to || amount === "") {
      return;
    }

    const timer = setTimeout(() => {
      if (from && to) {
        sendRequest(
          `https://api.apilayer.com/exchangerates_data/convert?to=${to}&from=${from}&amount=${+amount}`
        );
      }
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [state, from, to, amount]);

  useEffect(() => {
    if (currencyForm || currencyTo) {
      setState({ from: currencyForm || from, to: currencyTo || to, amount });
      return;
    }

    setState({ from, to, amount });
  }, [currencyForm, currencyTo]);

  useEffect(() => {
    if (currenciesError) {
      setIsOpenErrorSnackbar(true);
    }

    if (convertorError) {
      setIsOpenErrorSnackbar(true);
    }
  }, [currenciesError, convertorError]);

  const selectHandleChange = (param: CurrencyItem, name: string) => {
    if (name === "to") {
      setState((prevState) => ({ ...prevState, to: param.key }));
      localStorage.setItem("to", param.key);
      return;
    }

    setState((prevState) => ({ ...prevState, from: param.key }));
    localStorage.setItem("from", param.key);
  };

  const inputHandleChange = (event: SyntheticEvent) => {
    let target = event.target as HTMLInputElement;
    if (target.value === "" || /^\d+$/.test(target.value)) {
      setAmountInputError("");
      setState((prevState) => ({ ...prevState, amount: target.value }));
    } else {
      setState((prevState) => ({ ...prevState, amount: "" }));
      setAmountInputError("Must be number!");
    }
  };

  const findCurrencyElem = (partState: string): CurrencyItem => {
    const elem =
      partState === "from"
        ? currencies.find((c) => c.key === state.from)
        : currencies.find((c) => c.key === state.to);

    return { label: elem?.value || "", key: elem?.key || "" } as CurrencyItem;
  };

  return (
    <>
      <Box className="rate-container">
        {(currenciesLoading || convertorLoading) && (
          <Box
            style={{ width: "200%", display: "flex", justifyContent: "center" }}
          >
            <LoadingSpinner />
          </Box>
        )}

        {!currenciesLoading && !convertorLoading && !!currencies?.length && (
          <>
            <Box className="exchange-select-container" sx={{ width: 250 }}>
              <Autocomplete
                selectOnFocus
                disablePortal
                isOptionEqualToValue={(option, value) => {
                  return option.key === value.key;
                }}
                value={findCurrencyElem("from")}
                id="from"
                onChange={(event, newValue) => {
                  if (newValue) {
                    selectHandleChange(newValue, "from");
                  }
                }}
                options={currencies.map((c) => ({
                  label: c.value,
                  key: c.key,
                }))}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Currencies" />
                )}
              />

              <TextField
                id="from-input"
                variant="filled"
                onChange={inputHandleChange}
                value={state.amount}
                fullWidth
                error={!!amountInputError}
                helperText={amountInputError}
              />
            </Box>
            <Box className="exchange-select-container" sx={{ width: 250 }}>
              <Autocomplete
                disablePortal
                id="to"
                isOptionEqualToValue={(option, value) => {
                  return option.key === value.key;
                }}
                value={findCurrencyElem("to")}
                onChange={(event, newValue) => {
                  if (newValue) {
                    selectHandleChange(newValue, "to");
                  }
                }}
                options={currencies.map((c) => ({
                  label: c.value,
                  key: c.key,
                }))}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Currencies" />
                )}
              />
              <TextField
                fullWidth
                id="to"
                value={data?.result}
                variant="filled"
                disabled
              />
            </Box>
          </>
        )}
      </Box>
      {isOpenErrorSnackbar && (
        <CustomizedSnackbars
          isOpen={isOpenErrorSnackbar}
          message={currenciesError || convertorError}
        />
      )}
    </>
  );
};
