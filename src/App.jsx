import Banner from "./Banner";
import Cart from "./Cart";
import HomePage from "./HomePage";
import app from "./firebase";

function App() {
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
          className="w-[75%] border-r-[1px]"
          style={{ height: "calc(100vh - 64px)" }}
        >
          <HomePage />
        </div>

        {/* Cart */}
        <div
          className="w-[25%] fixed right-0 top-16"
          style={{ height: "calc(100vh - 64px)" }}
        >
          <Cart />
        </div>
      </div>
    </div>
  );
}

export default App;
