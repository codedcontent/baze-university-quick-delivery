import Banner from "./Banner";
import Cart from "./Cart";
import HomePage from "./HomePage";
import app from "./firebase";
import useAppState from "./hooks/useAppState";
import useScreenState from "./hooks/useScreenState";

function App() {
  const { appState } = useAppState();
  const { showCart } = appState;
  const { screenWidth } = useScreenState();

  return (
    <div className="relative h-screen">
      {/* Banner */}
      <Banner />

      {/* Main Page and Side Cart */}
      <div
        className="flex relative top-16"
        style={{ height: "calc(100vh - 64px)" }}
      >
        {/* Home Page */}
        <div
          className={`xl:w-[75%] lg:w-[65%] md:w-full border-r-[1px]`}
          style={{ height: "calc(100vh - 64px)" }}
        >
          <HomePage />
        </div>

        {/* Cart */}
        <div
          className={`xl:w-[25%] lg:w-[35%] md:w-full fixed right-0 top-16 ${
            showCart ? "w-full md:block z-50 bg-white" : "md:hidden"
          }`}
          style={{ height: "calc(100vh - 64px)" }}
        >
          <Cart />
        </div>
      </div>
    </div>
  );
}

export default App;
