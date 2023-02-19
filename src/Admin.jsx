import React, { useEffect, useState } from "react";
import MyButton from "./components/MyButton";
import OrderItem from "./components/OrderItem";
import { ref, onValue } from "firebase/database";
import { db } from "./firebase";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [orderCompleted, setOrderCompleted] = useState(false);

  const UserNotAuthenticated = () => {
    return (
      <div className="h-full w-full flex flex-col justify-center items-center">
        <form
          className="md:w-1/2 w-4/5 border-2 border-secondary p-5 rounded-md space-y-6"
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
    const [allOrders, setAllOrders] = useState(null);

    useEffect(() => {
      const allOrdersRef = ref(db, "allOrders");

      onValue(allOrdersRef, (snapshot) => {
        if (!snapshot.exists()) return;

        const data = snapshot.val();

        const mappedOrders = Object.entries(data).map((entry) => ({
          orderId: entry[0],
          order: entry[1].order,
          phoneNumber: entry[1].phoneNumber,
          timestamp: entry[1].timestamp,
        }));

        setAllOrders(mappedOrders);
        setOrderCompleted(false);
      });
    }, [orderCompleted]);

    return (
      <div className="h-full w-full md:px-20 px-10 md:py-10 py-5">
        {!allOrders ? (
          <h1 className="text-xl">
            No orders yet. Get of your butts and go reach out to potential
            customers.
          </h1>
        ) : (
          <>
            <p className="font-semibold text-lg text-accent">
              Here are the orders coming in, fulfill them fast, LET'S GOOOOOO
              🚀🚀🚀
            </p>

            <div className="flex flex-wrap mt-10 gap-4">
              {allOrders.map((orderDetails, index) => (
                <OrderItem
                  orderDetails={orderDetails}
                  key={orderDetails.orderId}
                  index={index}
                  orderCompleted={orderCompleted}
                  setOrderCompleted={setOrderCompleted}
                />
              ))}
            </div>
          </>
        )}
      </div>
    );
  };

  const handleLogin = () => {
    const authPassword = import.meta.env.VITE_ADMIN_PASSWORD;

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
