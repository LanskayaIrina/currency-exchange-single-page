import React, { useEffect, useState } from "react";

import { RootState } from "../../store/store";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { getCurrencyValues } from "../../store/converterReducer";
import { Currency, getCurrencySymbols } from "../../store/currenciesReducer";
import { CurrencyBox } from "./CurrencyBox/CurrencyBox";
import { LoadingSpinner } from "../../UI/LoadingSpinner";
import { CustomizedSnackbars } from "../../UI/CustomizedSnackbars";

import Box from "@mui/material/Box";

import "./CurrencyConverter.scss";

export const ConverterContext = React.createContext({
  firstSelect: "",
  secondSelect: "",
});

const initialSelectState = {
  firstSelect: "",
  secondSelect: "",
};

const initialState = {
  firstInput: "1",
  secondInput: "",
  fromCurrency: "firstInput",
};

type InputValue = typeof initialState;
type SelectValues = typeof initialSelectState;

export const CurrencyConverter = () => {
  const { error: converterError } = useAppSelector(
    (state: RootState) => state.convertor
  );
  const {
    currencies,
    loading: currenciesLoading,
    error: currenciesError,
  } = useAppSelector((state: RootState) => state.currencies);

  const dispatch = useAppDispatch();

  const [isOpenErrorSnackbar, setIsOpenErrorSnackbar] = useState(false);
  const [state, setState] = useState<InputValue>({
    ...initialState,
  });

  const firstSelect = "firstSelect";
  const secondSelect = "secondSelect";
  const firstInput = "firstInput";
  const secondInput = "secondInput";

  const firstStorageSelect = localStorage.getItem(firstSelect);
  const secondStorageSelect = localStorage.getItem(secondSelect);

  const [selectState, setSelectState] = useState<SelectValues>({
    firstSelect: firstStorageSelect ?? initialSelectState.firstSelect,
    secondSelect: secondStorageSelect ?? initialSelectState.secondSelect,
  });

  useEffect(() => {
    dispatch(getCurrencySymbols());
  }, [dispatch]);

  useEffect(() => {
    if (currenciesError || converterError) {
      setIsOpenErrorSnackbar(true);
    }
  }, [currenciesError, converterError]);

  useEffect(() => {
    if (!selectState.firstSelect || !selectState.secondSelect) {
      return;
    }

    const data = {
      firstSelect: {
        type: state.fromCurrency === firstInput ? "from" : "to",
        value: selectState.firstSelect,
      },
      secondSelect: {
        type: state.fromCurrency === secondInput ? "from" : "to",
        value: selectState.secondSelect,
      },
      amount:
        state.fromCurrency === firstInput
          ? state.firstInput
          : state.secondInput,
    };

    const timer = setTimeout(() => {
      dispatch(getCurrencyValues(data));
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [
    state.firstInput,
    state.secondInput,
    selectState.firstSelect,
    selectState.secondSelect,
    state.fromCurrency,
    dispatch,
  ]);

  const selectHandleChange = (key: string, name: string) => {
    if (name === firstSelect) {
      setSelectState((prevState) => ({
        ...prevState,
        firstSelect: key,
      }));
      return;
    }

    setSelectState((prevState) => ({
      ...prevState,
      secondSelect: key,
    }));
  };

  const inputHandleChange = ({
    activeInput,
    value,
  }: {
    activeInput: string;
    value: string;
  }): void => {
    if (activeInput === firstInput) {
      setState((prevState) => ({
        ...prevState,
        firstInput: value,
        fromCurrency: activeInput,
      }));
      return;
    }
    if (activeInput === secondInput) {
      setState((prevState) => ({
        ...prevState,
        secondInput: value,
        fromCurrency: activeInput,
      }));
      return;
    }
  };

  const options = getOptions(currencies);

  let content: JSX.Element | undefined = undefined;

  if (currenciesLoading) {
    content = (
      <Box style={{ width: "200%", display: "flex", justifyContent: "center" }}>
        <LoadingSpinner />
      </Box>
    );
  }

  if (!currenciesLoading && !!currencies?.length) {
    content = (
      <ConverterContext.Provider
        value={{
          firstSelect: firstStorageSelect ?? initialSelectState.firstSelect,
          secondSelect: secondStorageSelect ?? initialSelectState.secondSelect,
        }}
      >
        <CurrencyBox
          options={options}
          selectId={firstSelect}
          inputId={firstInput}
          activeInput={state.fromCurrency === firstInput}
          onInputChange={inputHandleChange}
          onSelectChange={selectHandleChange}
        />
        <CurrencyBox
          options={options}
          selectId={secondSelect}
          inputId={secondInput}
          activeInput={state.fromCurrency === secondInput}
          onInputChange={inputHandleChange}
          onSelectChange={selectHandleChange}
        />
      </ConverterContext.Provider>
    );
  }

  return (
    <>
      <Box className="rate-container">{content}</Box>

      {isOpenErrorSnackbar && converterError && (
        <CustomizedSnackbars
          isOpen={isOpenErrorSnackbar}
          message={converterError as string}
        />
      )}

      {isOpenErrorSnackbar && currenciesError && (
        <CustomizedSnackbars
          isOpen={isOpenErrorSnackbar}
          message={currenciesError}
        />
      )}
    </>
  );
};

const getOptions = (
  currencies: Currency[]
): { label: string; key: string }[] => {
  return currencies.map((c) => ({
    label: c.value,
    key: c.key,
  }));
};
