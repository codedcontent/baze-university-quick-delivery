import React from "react";
import CartItems from "./components/CartItems";
import MyButton from "./components/MyButton";
import useAppState from "./hooks/useAppState";
import { Close } from "@mui/icons-material";

const Cart = () => {
  const { appState, setAppState } = useAppState();

  const { cart } = appState;

  const cartTotal = cart
    .map((item) => item.price * item.mealCount)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  return (
    <div
      className="w-full flex flex-col relative"
      style={{ height: "calc(100vh - 64px)" }}
    >
      {/* Cart Header Text */}
      <div className="flex justify-between items-center w-full h-20 border-b-[1px] px-10">
        <div className="flex flex-col justify-center items-start">
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

        <div
          className="text-red-500 lg:hidden"
          onClick={() => {
            setAppState((prev) => ({ ...prev, showCart: false }));
          }}
        >
          <Close fontSize="large" />
        </div>
      </div>

      {/* Cart Items */}
      <div className="px-10 mb-32 overflow-y-scroll flex-1 pt-4" id="cartItems">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8">
          {cart.map((cartItem, index) => (
            <CartItems
              key={index}
              mealName={cartItem.mealName}
              mealPrice={cartItem.price}
              mealImage={cartItem.mealImage}
              mealCount={cartItem.mealCount}
            />
          ))}
        </div>
      </div>

      {/* Cart Checkout */}
      {cart.length > 0 && (
        <div className="w-full py-2 bg-white px-10 border-y-[1px] absolute left-0 bottom-0 space-y-2">
          <p className="text-sm">
            Take away pack --{" "}
            <span className="font-bold">
              ₦ 100 * {cart.length} = {cart.length * 100}
            </span>
          </p>

          <p className="text-sm">
            Delivery fee -- <span className="font-bold">₦ 200</span>
          </p>

          <div className="flex w-full justify-between">
            <MyButton
              title={"Make an order"}
              buttonAction={() => {
                setAppState((prev) => ({ ...prev, showOverlay: true }));
              }}
            />

            <div className="flex flex-col justify-center items-center">
              <p className="">Total</p>
              <p className="text-sm font-bold">
                ₦ {cartTotal.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, "$&,")}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
