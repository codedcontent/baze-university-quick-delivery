import React, { useState } from "react";
import { AiOutlineMinus } from "react-icons/ai";
import { IoIosAdd } from "react-icons/io";
import useAppState from "../hooks/useAppState";

const CartItems = ({ type, mealName, mealPrice, mealImage, mealCount }) => {
  const { appState, setAppState } = useAppState();
  const { cart } = appState;

  const incrementItemInCart = () => {
    if (mealCount < 5) {
      // Cart items to not increment
      const cartItemsToNotIncrement = cart.filter(
        (item) => item.mealName !== mealName
      );

      // The cart item to increment
      const cartItemToIncrement = cart.find(
        (item) => item.mealName === mealName
      );

      // Increment meal count
      cartItemToIncrement.mealCount += 1;

      // Get the index of the item to increment
      const indexOfItemToIncrement = cart.findIndex(
        (item) => item.mealName === mealName
      );

      cart.splice(indexOfItemToIncrement, 1, cartItemToIncrement);

      setAppState((prev) => ({
        ...prev,
        cart: [...cart],
      }));
    } else {
      alert("You've reached the max order limit!");
    }
  };

  const decrementItemInCart = () => {
    if (mealCount !== 1) {
      // Cart items to not increment
      const cartItemsToNotIncrement = cart.filter(
        (item) => item.mealName !== mealName
      );

      // The cart item to increment
      const cartItemToIncrement = cart.find(
        (item) => item.mealName === mealName
      );

      // Increment meal count
      cartItemToIncrement.mealCount -= 1;

      // Get the index of the item to increment
      const indexOfItemToIncrement = cart.findIndex(
        (item) => item.mealName === mealName
      );

      cart.splice(indexOfItemToIncrement, 1, cartItemToIncrement);

      setAppState((prev) => ({
        ...prev,
        cart: [...cart],
      }));
    }
  };

  const removeItemFromCart = () => {
    setAppState((prev) => {
      return {
        ...prev,
        cart: prev.cart.filter(
          (itemInCart) => itemInCart.mealName !== mealName
        ),
      };
    });
  };

  return (
    <div className="flex gap-4 select-none w-full">
      <img
        src={mealImage}
        alt="cart item image"
        className="h-14 w-14 object-cover rounded-full"
      />

      <div className="flex flex-col gap-1 w-full">
        <span className="text-sm font-medium">{mealName}</span>
        <span className="text-sm font-bold">₦ {mealPrice}</span>

        <div className="flex gap-6 place-items-center mt-1">
          {/* Control the amount of a particular item being bought  */}
          <div className="flex">
            {/* Reduce more */}
            <div
              className="border-secondary w-8 h-8 flex place-content-center bg-secondary rounded-l-md cursor-pointer"
              onClick={decrementItemInCart}
            >
              <span className="text-white flex justify-center items-center">
                <AiOutlineMinus />
              </span>
            </div>

            {/* Amount */}
            <div className="border-[1px] border-secondary w-8 h-8 flex place-content-center bg-white">
              <span className="text-secondary flex justify-center items-center">
                {mealCount}
              </span>
            </div>

            {/* Add more */}
            <div
              className="border-secondary w-8 h-8 flex place-content-center bg-secondary rounded-r-md cursor-pointer"
              onClick={incrementItemInCart}
            >
              <span className="text-white flex justify-center items-center">
                <IoIosAdd />
              </span>
            </div>
          </div>

          <span
            className="underline text-accent text-xs cursor-pointer hover:text-red-500"
            onClick={() => removeItemFromCart(mealName)}
          >
            Remove
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
