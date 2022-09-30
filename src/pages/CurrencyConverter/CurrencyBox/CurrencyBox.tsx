import React, { useCallback, useContext, useState } from "react";

import Box from "@mui/material/Box";
import { Autocomplete } from "@mui/material";
import TextField from "@mui/material/TextField";

import { CurrencyInput } from "./CurrencyInput";
import { ConverterContext } from "../CurrencyConverter";

export interface CurrencyItem {
  label: string;
  key: string;
}

interface CurrencyBoxProps {
  options: CurrencyItem[];
  selectId: string;
  inputId: string;
  activeInput: boolean;
  onSelectChange(key: string, type: string): void;
  onInputChange(params: { activeInput: string; value: string }): void;
}

const initialState = {
  selectValue: { label: "", key: "" },
};

type State = typeof initialState;

export const CurrencyBox = React.memo(
  ({
    options,
    selectId,
    inputId,
    activeInput,
    onSelectChange,
    onInputChange,
  }: CurrencyBoxProps) => {
    const { firstSelect, secondSelect } = useContext(ConverterContext);

    const currentSelect = findCurrencyElem(
      options,
      selectId === "firstSelect" ? firstSelect : secondSelect
    );

    const [state, setState] = useState<State>({
      ...initialState,
      selectValue: currentSelect ?? initialState.selectValue,
    });

    const selectHandleChange = useCallback(
      (param: CurrencyItem): void => {
        setState((prevState) => ({
          ...prevState,
          selectValue: param,
        }));

        onSelectChange(param.key, selectId);
        localStorage.setItem(selectId, param.key);
      },
      [onSelectChange, selectId]
    );

    return (
      <Box className="exchange-select-container" sx={{ width: 250 }}>
        <Autocomplete
          className="custom-autocomplete"
          selectOnFocus
          disablePortal
          isOptionEqualToValue={(option, value) => {
            return option.key === value.key;
          }}
          value={state.selectValue}
          id={selectId}
          onChange={(event, newValue) => {
            if (newValue) {
              selectHandleChange(newValue);
            }
          }}
          options={options.map((c) => ({
            label: c.label,
            key: c.key,
          }))}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Currencies" />}
        />

        <CurrencyInput
          inputId={inputId}
          resultInput={!activeInput}
          onChange={onInputChange}
        />
      </Box>
    );
  }
);

const findCurrencyElem = (
  options: CurrencyItem[],
  storageSelect: string | null
): CurrencyItem => {
  const elem = options.find((c) => c.key === storageSelect);

  return { label: elem?.label || "", key: elem?.key || "" } as CurrencyItem;
};
