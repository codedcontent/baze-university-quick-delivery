import React from "react";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import heroImage from "./assets/green bg.jpg";
import MenuItem from "./components/MenuItem";
import img1 from "./assets/fried chicken.jpg";
import img2 from "./assets/jollof rice.jpg";
import img3 from "./assets/fried rice -2.jpg";
import useAppState from "./hooks/useAppState";
import useScreenState from "./hooks/useScreenState";

const HomePage = () => {
  const { appState, setAppState } = useAppState();
  const { screenWidth } = useScreenState();

  return (
    <div className="w-full h-full">
      {/* Nav */}
      {screenWidth < 976 && !appState.showCart && (
        <nav className="xl:w-[75%] lg:w-[65%] w-full bg-primary h-20 fixed top-16 left-0 flex justify-between items-center xl:px-20 lg:px-16 px-12 z-20">
          {/* Logo name */}
          <div className="flex flex-col justify-center items-center">
            <p className="md:text-3xl text-xl font-bold text-white">
              Baze University
            </p>
            <p className="md:text-sm text-xs text-white">Quick Deliveries</p>
          </div>

          {/* Cart Button */}
          <div
            className="relative"
            onClick={() => {
              setAppState((prev) => ({ ...prev, showCart: true }));
            }}
          >
            <div className="absolute top-1 -right-[2px] flex justify-center items-center">
              <span className="animate-ping absolute inline-flex h-4 w-4 rounded-full bg-red-700 opacity-75"></span>

              <span className="absolute h-2 w-2 rounded-full bg-red-700"></span>
            </div>

            <ShoppingCartOutlinedIcon
              className="text-white"
              invisible={appState.cart.length > 0 ? "true" : "false"}
            />
          </div>
        </nav>
      )}

      {/* Hero Section */}
      <div
        className="flex flex-col relative justify-center items-center w-[100.1%] object-cover bg-center"
        style={{
          backgroundImage: `url('${heroImage}')`,
          height: "calc(100vh - 64px)",
        }}
      >
        {/* Header texts */}
        <div className="w-full flex flex-col justify-center items-center px-12">
          <p className="md:text-7xl text-4xl font-bold text-white text-center">
            Baze University
          </p>

          <p className="md:text-5xl text-2xl font-medium text-white text-center md:mt-3">
            Quick Delivery
          </p>

          <p className="md:text-2xl text-lg text-center font-normal text-white mt-6">
            Cheaper meals delivered to your class and hostel
          </p>
        </div>

        {/* CTA buttons */}
        <div className="w-full gap-10 flex justify-center items-center mt-20 px-5">
          <a href="#menu">
            <button className="md:py-4 py-2 cursor-pointer bg-secondary text-white md:px-6 px-3 rounded-md flex justify-center items-center md:text-base text-sm">
              Order Now
            </button>
          </a>

          <button
            className="md:py-4 py-2 cursor-pointer border-secondary border-[1px] bg-white text-secondary md:px-6 px-3 rounded-md flex justify-center items-center md:text-base text-sm"
            // onClick={buttonAction}
            // type={type}
          >
            Top-up your meal balance
          </button>
        </div>
      </div>

      {/* Menu Section */}
      <div
        className="w-full xl:px-20 px-12 md:px-16 md:py-10 py-5 border-x-[1px]"
        id="menu"
      >
        <p className="md:text-3xl text-xl text-accent">Browse our menu</p>
        <p className="md:text-lg text-sm text-accent">
          Check out our affordable meals and more filling meals
        </p>

        <div className="grid md:grid-cols-3 grid-cols-1 lg:mt-10 md:mt-8 mt-4 gap-y-3">
          <MenuItem mealName={"Chicken"} mealImage={img1} price={1500} />
          <MenuItem mealName={"Jollof Rice"} mealImage={img2} price={900} />
          <MenuItem mealName={"Fried Rice"} mealImage={img3} price={900} />
          <MenuItem mealName={"Fried Ric"} mealImage={img3} price={900} />
          <MenuItem mealName={"Frie Rice"} mealImage={img3} price={900} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
