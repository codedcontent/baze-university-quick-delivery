import React, { useEffect, useRef, useState } from "react";
import OrderItem from "./components/OrderItem";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";
import MyButton from "./components/MyButton";
import useAppState from "./hooks/useAppState";
import loadingBeanEater from "./assets/Bean Eater-1s-200px.svg";

// TODO: FIX_ERROR => User completing the wrong orders

const UserIsAuthenticated = () => {
  const { appState, setAppState } = useAppState();

  const [allOrders, setAllOrders] = useState(null);

  const [orderCompleted, setOrderCompleted] = useState(false);

  const { showAdminOverlay } = appState;

  const parentRef = useRef();

  // Function to confirm that the admin wants to complete an order
  const handleConfirmation = () => {
    parentRef.current.startOrderCompletion();
  };

  useEffect(() => {
    const orderQuery = query(collection(db, "allOrders"));

    const unsubscribe = onSnapshot(orderQuery, (querySnapshot) => {
      const orders = [];

      querySnapshot.forEach((doc) => {
        orders.push({ ...doc.data(), orderId: doc.id });
      });

      setAllOrders(orders);
    });

    return () => {
      unsubscribe();
    };
  }, [orderCompleted]);

  return (
    <>
      {allOrders === null ? (
        <div className="w-screen h-screen flex justify-center items-center">
          <img src={loadingBeanEater} alt="I'm loading, please wait..." />
        </div>
      ) : (
        <div className="h-full w-full md:px-20 px-10 md:py-10 py-5">
          {showAdminOverlay && (
            <div className="absolute h-screen w-screen top-0 left-0 bg-black/50">
              <div className="transform -translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 md:w-96 w-[80%] h-48 bg-white px-10 rounded-md space-y-4 flex justify-center items-center flex-col">
                <p className="text-accent">
                  Are you sure you want to complete this order?
                </p>

                <div className="flex justify-end items-center gap-6 self-end">
                  <MyButton title={"Yes"} buttonAction={handleConfirmation} />

                  <MyButton
                    title={"No"}
                    variant="outlined"
                    buttonAction={() => {
                      setAppState((prev) => ({
                        ...prev,
                        showAdminOverlay: false,
                      }));
                    }}
                  />
                </div>
              </div>
            </div>
          )}
          {!allOrders.length ? (
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
                    orderId={orderDetails.orderId}
                    key={`${orderDetails.orderId} - ${index}`}
                    index={index}
                    orderCompleted={orderCompleted}
                    setOrderCompleted={setOrderCompleted}
                    innerRef={parentRef}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default UserIsAuthenticated;
