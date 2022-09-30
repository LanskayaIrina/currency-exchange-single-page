import { basUrl } from "./url";
import { Currency } from "../currenciesReducer";

export type CurrencyServerData = {
  date: string;
  rates: { USD: string; EUR: string };
  base: string;
};

export const getCurrencyData = (): Promise<CurrencyServerData> => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await fetch(`${basUrl}/latest?symbols=EUR,USD&base=UAH`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          apikey: `${process.env.REACT_APP_API_KEY}`,
        },
      });
      const res = await data.json();
      if (res?.message as string) {
        reject(res?.message);
      }
      resolve(res as CurrencyServerData);
    } catch (e) {
      reject(e);
    }
  });
};

export const getCurrencySymbolsData = (): Promise<Currency[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await fetch(`${basUrl}/symbols`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          apikey: `${process.env.REACT_APP_API_KEY}`,
        },
      });
      const res = await data.json();

      if (res?.message as string) {
        reject(res?.message);
      }
      if (res?.success) {
        let currencies: Currency[] = [];

        for (let [key, value] of Object.entries(res.symbols)) {
          currencies = [
            ...currencies,
            { key, value } as { key: string; value: string },
          ];
        }
        resolve(currencies);
      }
    } catch (e) {
      reject(e);
    }
  });
};
