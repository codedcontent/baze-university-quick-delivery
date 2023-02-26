import React, { useImperativeHandle } from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import useAppState from "../hooks/useAppState";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "NGN",
  minimumFractionDigits: 2,
});

const OrderItem = ({
  orderDetails,
  orderId,
  index,
  setOrderCompleted,
  innerRef,
}) => {
  const { setAppState } = useAppState();

  const { paymentInfo, order } = orderDetails;

  // The total amount that the customer will buy for all the meals they ordered.
  const totalAmountToPay = order
    .map((orderItem) => orderItem.price)
    .reduce((acc, currentVal) => acc + currentVal);

  const completeOrder = async () => {
    setOrderCompleted(true);

    setAppState((prev) => ({ ...prev, showAdminOverlay: false }));

    await deleteDoc(doc(db, `allOrders/${orderDetails.orderId}`));
  };

  useImperativeHandle(innerRef, () => ({
    startOrderCompletion() {
      completeOrder();
    },
  }));

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
          <a href={`tel:${paymentInfo.phoneNumber}`}>
            <span className="text-secondary font-normal underline">
              {paymentInfo.phoneNumber}
            </span>
          </a>
        </span>

        {/* Delivery location */}
        <span className="text-sm font-bold flex justify-between items-center w-full gap-4">
          Delivery location:{" "}
          <span className="text-secondary font-normal">
            {paymentInfo.deliveryLocation}
          </span>
        </span>

        <button
          className="py-2 cursor-pointer bg-secondary text-white px-4 rounded-md flex justify-center items-center"
          onClick={() => {
            setAppState((prev) => ({ ...prev, showAdminOverlay: true }));
          }}
        >
          Completed Order
        </button>
      </div>
    </div>
  );
};

export default OrderItem;
