import { createContext, useContext } from "react";

const PropContext = createContext();

export const PropProvider = ({ children, value }) => {
  return <PropContext.Provider value={value}>{children}</PropContext.Provider>;
};

export const usePropContext = () => {
  return useContext(PropContext);
};

export default usePropContext;
