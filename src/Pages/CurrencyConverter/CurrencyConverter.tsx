import { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import "./CurrencyConverter.scss";

const initialState = {
  from: "",
  to: "",
  amount: "1",
};

type InputValue = typeof initialState;

export const CurrencyConverter = () => {
  const [state, setState] = useState<InputValue>(initialState);

  const selectHandleChange = (event: SelectChangeEvent) => {
    if (event.target.name === "to-select") {
      setState((prevState) => ({ ...prevState, to: event.target.value }));
      return;
    }

    setState((prevState) => ({ ...prevState, from: event.target.value }));
  };

  const inputHandleChange = (event: any) => {
    setState((prevState) => ({ ...prevState, amount: event.target.value }));
  };

  return (
    <Box className="rate-container">
      <Box className="exchange-select-container" sx={{ width: 250 }}>
        <FormControl fullWidth>
          <InputLabel id="from-select-label">From</InputLabel>
          <Select
            labelId="from-select-label"
            id="from-select-label"
            value={state.from}
            label="from currency"
            onChange={selectHandleChange}
            name="from-select"
          >
            <MenuItem value={"EUR"}>EUR</MenuItem>
            <MenuItem value={"UAH"}>UAH</MenuItem>
            <MenuItem value={"USD"}>USD</MenuItem>
          </Select>
        </FormControl>

        <TextField
          id="from-input"
          variant="filled"
          onChange={inputHandleChange}
          value={state.amount}
          fullWidth
        />
      </Box>
      <Box className="exchange-select-container" sx={{ width: 250 }}>
        <FormControl fullWidth>
          <InputLabel id="to-select-label">To</InputLabel>
          <Select
            labelId="to-select-label"
            id="to-select-label"
            value={state.to}
            label="To"
            onChange={selectHandleChange}
            name="to-select"
          >
            <MenuItem value={"EUR"}>EUR</MenuItem>
            <MenuItem value={"UAH"}>UAH</MenuItem>
            <MenuItem value={"USD"}>USD</MenuItem>
          </Select>
        </FormControl>
        <TextField fullWidth id="to" variant="filled" disabled />
      </Box>
    </Box>
  );
};
