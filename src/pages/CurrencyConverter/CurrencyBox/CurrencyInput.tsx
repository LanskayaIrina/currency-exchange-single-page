import React, { useEffect, useState } from "react";

import { useAppSelector } from "../../../hooks/redux-hooks";
import { RootState } from "../../../store/store";
import { LoadingSpinner } from "../../../UI/LoadingSpinner";

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

interface CurrencyInputProps {
  inputId: string;
  resultInput: boolean;
  onChange(params: { activeInput: string; value: string }): void;
}

export const CurrencyInput = React.memo(
  ({ inputId, resultInput, onChange }: CurrencyInputProps) => {
    const { result, loading } = useAppSelector(
      (state: RootState) => state.convertor
    );
    const [state, setState] = useState("1");
    const [error, setError] = useState("");

    useEffect(() => {
      if (resultInput) {
        setState(result);
      }
    }, [result, resultInput, setState]);

    const inputHandleChange = (
      event: React.ChangeEvent<HTMLInputElement>
    ): void => {
      let target = event.target;

      const isNumberAndNotEmptyValue = (value: string): Boolean => {
        return !isNaN(parseFloat(value));
      };

      if (isNumberAndNotEmptyValue(target.value)) {
        setError("");
        setState(target.value);

        onChange({ activeInput: inputId, value: target.value });

        return;
      } else {
        setState("");
        setError("Must be number!");
      }
    };

    let content;

    if (loading) {
      content = (
        <Box
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <LoadingSpinner />
        </Box>
      );
    }

    if (!loading) {
      content = (
        <TextField
          id={inputId}
          variant="filled"
          onChange={inputHandleChange}
          name={inputId}
          value={state}
          fullWidth
          error={!!error}
          helperText={error}
        />
      );
    }

    return <>{content}</>;
  }
);
