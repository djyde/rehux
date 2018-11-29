import * as React from "react";
import { useReducer, createContext, useContext } from "react";

const RehuxContext = createContext({
  state: null,
  dispatch: null
});

export const createRehux = (initialState, reducer) => ({
  Provider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
      <RehuxContext.Provider value={{ state, dispatch }}>
        {children}
      </RehuxContext.Provider>
    );
  },
  useRehooks() {
    const context = useContext(RehuxContext);
    return { state: context.state, dispatch: context.dispatch };
  }
});
