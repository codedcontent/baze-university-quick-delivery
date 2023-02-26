import Banner from "./Banner";
import Cart from "./Cart";
import HomePage from "./HomePage";
import useAppState from "./hooks/useAppState";
import useScreenState from "./hooks/useScreenState";
import { useEffect } from "react";
import CheckoutOverlay from "./CheckoutOverlay";

function App() {
  const { appState, setAppState } = useAppState();
  const { showCart, showOverlay, phoneNumber, cart } = appState;
  const { screenWidth } = useScreenState();

  // UseEffect to check for changes in screen size and set cart visibility
  useEffect(() => {
    if (screenWidth <= 976) {
      if (!showCart) {
        setAppState((prev) => ({ ...prev, showCart: false }));
      }
    } else {
      setAppState((prev) => ({ ...prev, showCart: true }));
    }
  }, [screenWidth]);

  return (
    <div className="relative h-screen">
      {/* Overlay */}
      {showOverlay && <CheckoutOverlay />}

      {/* Banner */}
      <Banner />

      {/* Main Page and Side Cart */}
      <div
        className="flex relative top-16"
        style={{ height: "calc(100vh - 64px)" }}
      >
        {/* Home Page */}
        <div
          className={`xl:w-[75%] lg:w-[65%] sm:w-full border-r-[1px]`}
          style={{ height: "calc(100vh - 64px)" }}
        >
          <HomePage />
        </div>

        {/* Cart */}
        {showCart && (
          <div
            className={`xl:w-[25%] lg:w-[35%] sm:w-full fixed right-0 top-16 ${
              showCart ? "w-full sm:block z-10 bg-white" : "sm:hidden"
            }`}
            style={{ height: "calc(100vh - 64px)" }}
          >
            <Cart />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
