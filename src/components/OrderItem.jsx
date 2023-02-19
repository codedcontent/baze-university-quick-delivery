import React from "react";
import { ref, onValue, remove } from "firebase/database";
import { db } from "../firebase";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "NGN",
  minimumFractionDigits: 2,
});

const OrderItem = ({ orderDetails, index, setOrderCompleted }) => {
  const { phoneNumber, order } = orderDetails;

  // The total amount that the customer will buy for all the meals they ordered.
  const totalAmountToPay = order
    .map((orderItem) => orderItem.price)
    .reduce((acc, currentVal) => acc + currentVal);

  const completeOrder = () => {
    const orderToCompleteRef = ref(db, `allOrders/${orderDetails.orderId}`);

    remove(orderToCompleteRef);
    setOrderCompleted(true);
  };

  return (
    <div className="space-y-2">
      {/* Order num to fulfill */}
      <span className="font-black">Order {index + 1}</span>

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
          Amount to receive:{" "}
          <span className="text-secondary">
            {formatter.format(totalAmountToPay)}
          </span>
        </span>

        {/* Customer contact */}
        <span className="text-sm font-bold flex justify-between items-center w-full gap-4">
          Customer contact:{" "}
          <span className="text-secondary font-normal underline">
            {phoneNumber}
          </span>
        </span>

        <button
          className="py-2 cursor-pointer bg-secondary text-white px-4 rounded-md flex justify-center items-center"
          onClick={completeOrder}
        >
          Completed Order
        </button>
      </div>
    </div>
  );
};

export default OrderItem;
