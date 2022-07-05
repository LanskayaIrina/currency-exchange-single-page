import { useCallback, useReducer } from "react";

type Nullable<T> = null | T;

const initialState = {
  loading: false,
  error: "",
  data: null as Nullable<any>,
};

type InitialState = typeof initialState;

type Action = ActionTypes<typeof actions>;

type PropertiesType<T> = T extends { [key: string]: infer U } ? U : never;
// @ts-ignore
type ActionTypes<T> = ReturnType<PropertiesType<T>>;

const actions = {
  0: () => ({ type: "SEND" } as const),
  1: (data: any) => ({ type: "RESPONSE", data } as const),
  2: (errorMessage: string) => ({ type: "ERROR", errorMessage } as const),
  3: () => ({ type: "CLEAR" } as const),
};

const httpReducer = (
  currentHttpState: InitialState,
  action: Action
): InitialState => {
  switch (action.type) {
    case "SEND": {
      return { ...currentHttpState, loading: true };
    }
    case "RESPONSE": {
      return {
        ...currentHttpState,
        loading: false,
        data: action.data,
      };
    }
    case "ERROR": {
      return {
        ...currentHttpState,
        loading: false,
        error: action.errorMessage,
      };
    }
    case "CLEAR": {
      return initialState;
    }
    default: {
      throw new Error("Should not be reached");
    }
  }
};

interface Response {
  isLoading: boolean;
  error: string;
  data: any;
  sendRequest: (url: string) => Promise<void>;
  clear: () => void;
}

export const useHttp = (): Response => {
  const [state, dispatch] = useReducer(httpReducer, initialState);

  const clear = useCallback(() => dispatch({ type: "CLEAR" }), []);

  const sendRequest = useCallback(async (url: string) => {
    try {
      dispatch({ type: "SEND" });

      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          apikey: `${process.env.REACT_APP_API_KEY}`,
        },
      });

      const data = await res.json();

      // if (data?.error) {
      //   dispatch({ type: "ERROR", errorMessage: data?.error.message });
      //   return null;
      // }

      dispatch({ type: "RESPONSE", data: data });
    } catch (e: any) {
      dispatch({ type: "ERROR", errorMessage: e.message });
    }
  }, []);

  return {
    isLoading: state.loading,
    error: state.error,
    data: state.data,
    sendRequest,
    clear,
  };
};
