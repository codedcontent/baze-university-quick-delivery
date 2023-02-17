import React, { useEffect, useState } from "react";
import MyButton from "./components/MyButton";
import img1 from "./assets/fried chicken.jpg";
import OrderItem from "./components/OrderItem";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [password, setPassword] = useState("");

  const UserNotAuthenticated = () => {
    return (
      <div className="h-full w-full flex flex-col justify-center items-center">
        <form
          className="w-1/2 border-2 border-secondary p-5 rounded-md space-y-6"
          onSubmit={(e) => {
            e.preventDefault();

            handleLogin();
          }}
        >
          <p className="text-xl font-semibold">
            You are not authenticated, provide your password
          </p>

          <input
            type="password"
            name="admin-password"
            id="adminPassword"
            placeholder="What is the password?"
            className="border-2 rounded-md outline-none px-4 w-full h-14"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            autoFocus
          />

          <MyButton title={"Login"} buttonAction={handleLogin} type="submit" />
        </form>
      </div>
    );
  };

  const UserIsAuthenticated = () => {
    const orderDetails = {
      phoneNumber: "phoneNum",
      order: [
        {
          mealCount: 2,
          mealImage: img1,
          mealPrice: 1500,
          mealName: "Chicken",
        },
        {
          mealCount: 1,
          mealImage: img1,
          mealPrice: 500,
          mealName: "White Rice",
        },
      ],
    };

    // TODO: UseEffect to fetch all the orders continuously
    useEffect(() => {}, []);

    return (
      <div className="h-full w-full px-20 py-10">
        <p className="font-semibold text-xl text-accent">
          Here are the orders coming in...
        </p>

        <div className="flex flex-wrap mt-4 gap-4">
          <OrderItem orderDetails={orderDetails} index={1} />
        </div>
      </div>
    );
  };

  const handleLogin = () => {
    const authPassword = import.meta.env.VITE_ADMIN_PASSWORD;

    console.log(authPassword, password);

    if (authPassword === password) {
      setIsAuthenticated(true);
    } else {
      alert("You shall not pass!");
    }
  };

  return (
    <div className="w-screen h-screen bg-white">
      {isAuthenticated ? <UserIsAuthenticated /> : <UserNotAuthenticated />}
    </div>
  );
};

export default Admin;
