import React, { useState } from "react";
import MyButton from "./components/MyButton";
import img1 from "./assets/fried chicken.jpg";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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
    return (
      <div className="h-full w-full px-20 py-10">
        <p className="font-semibold text-xl text-accent">
          Here are the orders coming in...
        </p>

        <div className="flex flex-wrap mt-4 gap-4">
          <div className="space-y-2">
            {/* Order num to fulfill */}
            <span className="font-black">Order 1</span>

            {/* Order Info */}
            <div className="flex gap-4 p-3 border-2 rounded-md">
              {/* <img
                src={img1}
                alt="cart item image"
                className="h-14 w-14 object-cover rounded-full"
              /> */}

              <div className="flex flex-col gap-2">
                <span className="text-sm">
                  Meal:{" "}
                  <span className="font-bold">
                    Fried Rice, Chicken, Salad, Fish
                  </span>
                </span>

                <span className="text-sm">
                  Amount to pay: <span className="font-bold">₦ 900</span>
                </span>

                <span className="text-sm">
                  Payment type: <span className="font-bold">Transfer</span>
                </span>

                <button
                  className="py-2 cursor-pointer bg-secondary text-white px-4 rounded-md flex justify-center items-center"
                  // onClick={buttonAction}
                >
                  Completed Order
                </button>
              </div>
            </div>
          </div>
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
