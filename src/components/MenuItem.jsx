import { push } from "firebase/database";
import React from "react";
import img1 from "../assets/fried rice -2.jpg";
import { db, ref, set } from "../firebase";
import useAppState from "../hooks/useAppState";
import MyButton from "./MyButton";

const MenuItem = ({ mealName, price, mealImage }) => {
  const { appState, setAppState } = useAppState();
  const { cart } = appState;

  const addToCart = () => {
    const mealItemInCart = cart.find((item) => item.mealName === mealName);

    if (mealItemInCart) {
      // Prevent adding in max order limit reached
      if (mealItemInCart.mealCount < 5) {
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

        setAppState((prev) => ({
          ...prev,
          cart: [...cartItemsToNotIncrement, cartItemToIncrement],
        }));
      } else {
        alert("You've reached the mac order limit!");
      }
    } else {
      setAppState((prev) => ({
        ...prev,
        cart: [...prev.cart, { mealName, price, mealImage, mealCount: 1 }],
      }));
    }
  };

  return (
    <div className="flex w-full justify-between items-center border-[1px] p-5">
      <div className="space-y-1">
        <p className="font-bold text-lg">{mealName}</p>
        <p className="font-medium">₦ {price}</p>

        <MyButton title={"Add to cart"} buttonAction={addToCart} />
      </div>

      <img
        src={mealImage}
        alt="menu item image"
        className="h-20 w-20 object-cover rounded-full"
      />
    </div>
  );
};

export default MenuItem;
