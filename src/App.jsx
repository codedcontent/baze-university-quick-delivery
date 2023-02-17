import Banner from "./Banner";
import Cart from "./Cart";
import HomePage from "./HomePage";
import useAppState from "./hooks/useAppState";
import useScreenState from "./hooks/useScreenState";
import { useEffect } from "react";
import MyButton from "./components/MyButton";
import { db, push, set, ref } from "./firebase";
import { serverTimestamp } from "firebase/database";

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

  const handleChange = (value) => {
    setAppState((prev) => ({ ...prev, phoneNumber: value }));
  };

  // Make order
  const makeOrder = () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      alert("Phone number is not valid");
    } else {
      // Create a new post reference with an auto-generated id
      const postListRef = ref(db, "allOrders");

      const newPostRef = push(postListRef);

      set(newPostRef, {
        phoneNumber,
        order: [...cart],
        timestamp: serverTimestamp(),
      });

      alert("Order successful. We'll contact you soon.");

      // Clear cart
      setAppState((prev) => ({ ...prev, cart: [] }));

      setAppState((prev) => ({ ...prev, showOverlay: false }));
    }
  };

  return (
    <div className="relative h-screen">
      {/* Overlay */}
      {showOverlay && (
        <div className="fixed top-0 left-0 h-screen w-screen z-50">
          <div className="absolute bg-white top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 p-10 lg:w-1/2 w-96 shadow-xl space-y-5">
            <h1 className="text-lg text-primary font-poppins font-medium">
              Please provide some details so we can contact you when your order
              is ready.
            </h1>

            <input
              type="text"
              placeholder="Your valid phone number..."
              className="w-full py-2 px-2 outline-none border-l-2"
              value={phoneNumber}
              onChange={(e) => {
                handleChange(e.target.value);
              }}
            />

            <div className="flex gap-4 justify-end items-center">
              <MyButton title={"Submit"} buttonAction={makeOrder} />

              <MyButton
                title={"Cancel"}
                variant="outlined"
                buttonAction={() => {
                  setAppState((prev) => ({ ...prev, showOverlay: false }));
                }}
              />
            </div>
          </div>
        </div>
      )}

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
