import React, { useState } from "react";
import MyButton from "./components/MyButton";
import useAppState from "./hooks/useAppState";
import { usePaystackPayment } from "react-paystack";
import { db } from "./firebase";
import constants from "./constants/constants";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import Select from "react-select";

const selectOptions = constants.deliveryLocations.map((x) => ({
  value: x,
  label: x,
}));

const CheckoutOverlay = () => {
  const { appState, setAppState } = useAppState();
  const { cart, paymentInfo } = appState;

  // Sum the monetary value of the items in the users cart
  const cartTotal =
    cart
      .map((item) => item.price * item.mealCount)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0) +
    constants.deliveryFee;

  let amountToPay = 0;

  // Calculate the amount to charge the customer
  const genAmountToChargeCustomer = () => {
    const amountToChargeIfBellow25 = parseInt(
      (cartTotal / 0.985 + 1).toFixed(0)
    );
    if (amountToChargeIfBellow25 >= 2500) {
      const amountToChargeIfAbove = parseInt(
        (cartTotal + 100) / 0.985 + 1
      ).toFixed(0);

      amountToPay = amountToChargeIfAbove;
    } else {
      amountToPay = amountToChargeIfBellow25;
    }
  };
  genAmountToChargeCustomer();

  // Is the delivery location selected
  const [selectedOption, setSelectedOption] = useState(selectOptions[0]);

  // Handle what happens when the users selects something
  const handleSelectChange = (data) => {
    setSelectedOption(data);

    // Update the payment info
    setAppState((prev) => ({
      ...prev,
      paymentInfo: { ...prev.paymentInfo, deliveryLocation: data.value },
    }));
  };

  // Paystack configuration options
  const config = {
    reference: new Date().getTime().toString(),
    email: paymentInfo.email,
    amount: amountToPay * 100,
    publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
  };

  // Initialize paystack payment with the config values
  const initializePayment = usePaystackPayment(config);

  const addOrderToDB = async (reference) => {
    console.log({
      reference,
      paymentInfo,
      order: [...cart],
      timestamp: serverTimestamp(),
    });
    // Add a new document with a generated id.
    const docRef = await addDoc(collection(db, "allOrders"), {
      reference,
      paymentInfo,
      order: [...cart],
      timestamp: serverTimestamp(),
    });

    // Inform or successful order
    alert("Order successful. We'll contact you soon.");

    // Clear cart
    setAppState((prev) => ({ ...prev, cart: [] }));

    // Remove payment overlay
    setAppState((prev) => ({ ...prev, showOverlay: false }));
  };

  const onSuccess = (reference) => {
    addOrderToDB(reference);
  };

  const onClose = () => {
    // implementation for whatever you want to do when the Paystack dialog closed.
    alert("You are terminating the transaction...");
  };

  const handleChange = (type, value) => {
    setAppState((prev) => ({
      ...prev,
      paymentInfo: { ...prev.paymentInfo, [type]: value },
    }));
  };

  const initiatePayment = () => {
    // Set the delivery location if it never changed
    if (!paymentInfo.deliveryLocation) {
      // Update the payment info
      setAppState((prev) => ({
        ...prev,
        paymentInfo: {
          ...prev.paymentInfo,
          deliveryLocation: selectedOption.value,
        },
      }));
    } else if (!paymentInfo.email) {
      // Ensure user enters the correct information.
      alert("Email is not valid");
    } else if (
      !paymentInfo.phoneNumber ||
      paymentInfo.phoneNumber.length < 10
    ) {
      alert("Phone number is not valid");
    } else {
      console.log(paymentInfo.deliveryLocation);
      initializePayment(onSuccess, onClose);
    }
  };

  return (
    <div className="fixed top-0 left-0 h-screen w-screen z-50">
      <div className="absolute bg-white top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 py-8 px-10 lg:w-1/2 md:w-96 w-[80%] shadow-xl space-y-6 rounded-md">
        <h1 className="text-lg text-primary font-poppins font-medium">
          Please fill in your delivery information.
        </h1>

        {/* The payment details form */}
        <form className="md:space-y-4 space-y-0" onSubmit={initiatePayment}>
          <div className="grid md:grid-cols-2  md:gap-x-5 md:gap-y-0 gap-y-5">
            {/* Email input */}
            <input
              type="text"
              placeholder="Email address"
              className="rounded-md w-full py-2 px-2 outline-none border-2 text-sm bg-white border-neutral-200"
              value={paymentInfo.email}
              onChange={(e) => {
                handleChange("email", e.target.value);
              }}
            />

            {/* Phone number input */}
            <input
              type="text"
              placeholder="A valid phone number"
              className="rounded-md w-full py-2 px-2 outline-none border-2 text-sm bg-white border-neutral-200"
              value={paymentInfo.phoneNumber}
              onChange={(e) => {
                handleChange("phoneNumber", e.target.value);
              }}
            />
          </div>

          {/* Delivery location input */}
          {/* <select
            name="deliveryLocation"
            className="rounded-sm w-full py-2 px-2 outline-none border-l-2 text-sm bg-gray-200 overflow-y-scroll"
          >
            <option value="">Delivery location within baze</option>
            {constants.deliveryLocations.map((deliveryLocation) => (
              <option value={deliveryLocation} className="overflow-y-scroll">
                {deliveryLocation}
              </option>
            ))}
          </select> */}

          <Select
            value={selectedOption}
            onChange={handleSelectChange}
            options={selectOptions}
          />
        </form>

        {/* CTA buttons -> proceed or cancel */}
        <div className="flex gap-4 mt-10 justify-end items-center">
          <MyButton
            title={"Proceed to payment"}
            buttonAction={initiatePayment}
          />

          <MyButton
            title={"Cancel"}
            variant="outlined"
            buttonAction={() => {
              setAppState((prev) => ({ ...prev, showOverlay: false }));
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutOverlay;
