import React from "react";
import CartItems from "./components/CartItems";
import MyButton from "./components/MyButton";
import useAppState from "./hooks/useAppState";

const Cart = () => {
  const { appState } = useAppState();

  const { cart } = appState;

  return (
    <div className="w-full h-full relative">
      {/* Cart Header Text */}
      <div className="w-full h-20 border-b-[1px] flex flex-col justify-center items-start px-10 mb-4">
        <p className="font-semibold text-xl text-accent">Your order</p>

        {cart.length === 0 ? (
          <p className="font-light text-sm text-accent">
            You have no item in your cart
          </p>
        ) : (
          <p className="font-light text-sm text-accent">
            You have {cart.length} item(s) in your cart
          </p>
        )}
      </div>

      {/* Cart Items */}
      <div
        className="px-10 pb-4 space-y-8 overflow-y-scroll"
        style={{ height: "calc(100vh - 240px" }}
      >
        {cart.map((cartItem, index) => (
          <CartItems
            key={index}
            mealName={cartItem.mealName}
            mealPrice={cartItem.price}
            mealImage={cartItem.mealImage}
          />
        ))}
      </div>

      {/* Cart Checkout */}
      <div className="w-full p-4 border-y-[1px] absolute left-0 bottom-0">
        <div className="flex w-full justify-between">
          <MyButton title={"Checkout"} />

          <div className="flex flex-col justify-center items-center">
            <p className="font-bold">Total</p>
            <p className="text-sm">₦ 2,500</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
