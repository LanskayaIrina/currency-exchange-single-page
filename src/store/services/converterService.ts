import { basUrl } from "./url";
import { ConverterData } from "../converterReducer";

export const getConverterData = ({
  firstSelect,
  secondSelect,
  amount,
}: ConverterData): Promise<ConverterData> => {
  const fromCurrency =
    firstSelect.type === "from" ? firstSelect.value : secondSelect.value;
  const toCurrency =
    firstSelect.type === "to" ? firstSelect.value : secondSelect.value;

  return new Promise(async (resolve, reject) => {
    try {
      const data = await fetch(
        `${basUrl}/convert?to=${toCurrency}&from=${fromCurrency}&amount=${amount}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            apikey: `${process.env.REACT_APP_API_KEY}`,
          },
        }
      );
      const res = await data.json();
      if (res?.message as string) {
        reject(res?.message);
      }

      if (res?.success) {
        resolve(res.result.toFixed(2));
      }
    } catch (e) {
      reject(e);
    }
  });
};
