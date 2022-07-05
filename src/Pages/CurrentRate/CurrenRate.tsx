import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setRate } from "../../store/rateReducer";
import { RootState } from "../../store/store";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import "./CurrentRate.scss";

export const CurrenRate = () => {
  const [baseCurrencyInputValue, setBaseCurrencyInputValue] = useState("USD");

  const base = useSelector((state: RootState) => state.rate.base);
  const dispatch = useDispatch();

  useEffect(() => {
    setBaseCurrencyInputValue(base);
  }, [base]);

  const handleChange = (event: SelectChangeEvent) => {
    dispatch(setRate({ base: event.target.value as string, firstValue: "3" }));
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="base-currency-select-label">Base currency</InputLabel>
        <Select
          labelId="base-currency-select-label"
          id="base-currency-select-label"
          value={baseCurrencyInputValue}
          label="Base currency"
          onChange={handleChange}
        >
          <MenuItem value={"EUR"}>EUR</MenuItem>
          <MenuItem value={"UAH"}>UAH</MenuItem>
          <MenuItem value={"USD"}>USD</MenuItem>
        </Select>
      </FormControl>
      <Box className="rate-textField-container" mt={2}>
        <TextField
          id={baseCurrencyInputValue === "USD" ? "UAH" : "USD"}
          label={baseCurrencyInputValue === "USD" ? "UAH" : "USD"}
          variant="outlined"
          value={""}
          disabled
        />
      </Box>
      <Box mt={2} className="rate-textField-container">
        <TextField
          id="EUR"
          label="EUR"
          value={""}
          variant="outlined"
          disabled
        />
      </Box>
    </Box>
  );
};
