import { createContext } from "react";

export const BackendContext = createContext();

const BackendContextProvider = (props) => {

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const contextValue = {
    BACKEND_URL
  };

  return (
    <BackendContext.Provider value={contextValue}>
      {props.children}
    </BackendContext.Provider>
  );
};

export default BackendContextProvider;