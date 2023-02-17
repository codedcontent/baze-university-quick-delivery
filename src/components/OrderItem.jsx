import React from "react";
import img1 from "../assets/fried rice -2.jpg";
import MyButton from "./MyButton";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "NGN",
  minimumFractionDigits: 2,
});

const OrderItem = ({ orderDetails, index }) => {
  const { phoneNumber, order } = orderDetails;

  // The total amount that the customer will buy for all the meals they ordered.
  const totalAmountToPay = order
    .map((orderItem) => orderItem.mealPrice)
    .reduce((acc, currentVal) => acc + currentVal);

  return (
    <div className="space-y-2">
      {/* Order num to fulfill */}
      <span className="font-black">Order {index}</span>

      {/* Order Info */}
      <div className="flex flex-col gap-2 p-3 border-2 rounded-md">
        {/* Actual content */}
        {order.map((orderItem, index) => (
          <div className="flex gap-4" key={index}>
            <img
              src={orderItem.mealImage}
              alt="cart item image"
              className="h-8 w-8 object-cover rounded-full"
            />

            <div className="space-x-3">
              <span className="font-normal">{orderItem.mealName}</span>

              <span className="">-</span>

              <span className="font-black">{orderItem.mealCount}</span>
            </div>
          </div>
        ))}

        <span className="text-sm font-bold flex justify-between items-center w-full gap-4">
          Amount to pay:{" "}
          <span className="text-secondary">
            {formatter.format(totalAmountToPay)}
          </span>
        </span>

        <button
          className="py-2 cursor-pointer bg-secondary text-white px-4 rounded-md flex justify-center items-center"
          // onClick={buttonAction}
        >
          Completed Order
        </button>
      </div>
    </div>
  );
};

export default OrderItem;
