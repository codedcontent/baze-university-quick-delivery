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
    } else {
      setAppState((prev) => ({
        ...prev,
        cart: [...prev.cart, { mealName, price, mealImage, mealCount: 1 }],
      }));
    }
  };

  return (
    <div className="flex w-full justify-between items-center border-[1px] xl:p-5 lg:p-4 md:p-3 xl:flex-row md:flex-col-reverse md:items-start">
      <div className="space-y-1">
        <p className="font-bold text-lg">{mealName}</p>
        <p className="font-medium">₦ {price}</p>

        <MyButton title={"Add to cart"} buttonAction={addToCart} />
      </div>

      <img
        src={mealImage}
        alt="menu item image"
        className="h-20 w-20 object-cover rounded-full md:mb-2"
      />
    </div>
  );
};

export default MenuItem;
