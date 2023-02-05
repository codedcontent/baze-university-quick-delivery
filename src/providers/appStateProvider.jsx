import { createContext, useState } from "react";

const AppStateContext = createContext();

export const AppStateProvider = ({ children }) => {
  const [appState, setAppState] = useState({
    cart: [],
  });

  return (
    <AppStateContext.Provider value={{ appState, setAppState }}>
      {children}
    </AppStateContext.Provider>
  );
};

export default AppStateContext;
