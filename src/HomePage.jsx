import React from "react";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import heroImage from "./assets/green bg.jpg";
import MyButton from "./components/MyButton";
import MenuItem from "./components/MenuItem";
import img1 from "./assets/fried chicken.jpg";
import img2 from "./assets/jollof rice.jpg";
import img3 from "./assets/fried rice -2.jpg";
import useAppState from "./hooks/useAppState";

const HomePage = () => {
  const { appState } = useAppState();

  return (
    <div className="w-full h-full">
      {/* Nav */}
      <nav className="w-[75%] bg-primary h-20 fixed top-16 left-0 flex justify-between items-center px-20 z-20">
        {/* Logo name */}
        <div className="flex flex-col justify-center items-center">
          <p className="text-3xl font-bold text-white">Baze University</p>
          <p className="text-sm text-white">Quick Deliveries</p>
        </div>

        {/* Cart */}
        <div className="relative">
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

      {/* Hero Section */}
      <div
        className="flex flex-col relative justify-center items-center  w-full object-cover bg-center"
        style={{
          backgroundImage: `url('${heroImage}')`,
          height: "calc(100vh - 64px)",
        }}
      >
        {/* Header texts */}
        <div className="w-full flex flex-col justify-center items-center">
          <p className="text-7xl font-bold text-white">Baze University</p>
          <p className="text-5xl font-bold text-white mt-3">Quick Delivery</p>
          <p className="text-2xl font-medium text-white mt-6">
            Cheaper meals delivered to your class and hostel
          </p>
        </div>

        {/* CTA buttons */}
        <div className="w-full gap-10 flex justify-center items-center mt-20">
          <a href="#menu">
            <button className="py-4 cursor-pointer bg-secondary text-white px-6 rounded-md flex justify-center items-center">
              Order Now
            </button>
          </a>

          <button
            className="py-4 cursor-pointer border-secondary border-[1px] bg-white text-secondary px-6 rounded-md flex justify-center items-center"
            // onClick={buttonAction}
            // type={type}
          >
            Top-up your meal balance
          </button>
        </div>
      </div>

      {/* Menu Section */}
      <div className="w-full px-20 py-10 border-x-[1px]" id="menu">
        <p className="text-3xl text-accent">Browse our menu</p>
        <p className="text-lg text-accent">
          Check out our affordable meals and more filling meals
        </p>

        <div className="grid grid-cols-3 mt-10 gap-y-3">
          <MenuItem mealName={"Chicken"} mealImage={img1} price={1500} />
          <MenuItem mealName={"Jollof Rice"} mealImage={img2} price={900} />
          <MenuItem mealName={"Fried Rice"} mealImage={img3} price={900} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
