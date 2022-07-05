import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { setBase } from "../../store/rateReducer";
import { useState } from "react";

export const CustomSelect = () => {
  const [inputValue, setInputValue] = useState("");
  const handleChange = (event: SelectChangeEvent) => {
    setInputValue(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="base-currency-select-label">Base currency</InputLabel>
      <Select
        labelId="base-currency-select-label"
        id="base-currency-select-label"
        value={inputValue}
        label="Base currency"
        onChange={handleChange}
      >
        <MenuItem value={"EUR"}>EUR</MenuItem>
        <MenuItem value={"UAH"}>UAH</MenuItem>
        <MenuItem value={"USD"}>USD</MenuItem>
      </Select>
    </FormControl>
  );
};
