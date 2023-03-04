import { createContext, useState } from "react";

const AppStateContext = createContext();

export const AppStateProvider = ({ children }) => {
  const [appState, setAppState] = useState({
    cart: [],
    showCart: true,
    showOverlay: false,
    paymentInfo: {
      email: "school@student.com",
      phoneNumber: "12345678963",
      deliveryLocation: "",
    },
    showAdminOverlay: false,
  });

  return (
    <AppStateContext.Provider value={{ appState, setAppState }}>
      {children}
    </AppStateContext.Provider>
  );
};

export default AppStateContext;
