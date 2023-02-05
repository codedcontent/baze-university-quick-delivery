import React from "react";

const MyButton = ({ variant, title, buttonAction, type }) => {
  if (variant === "outlined") {
    return (
      <button
        className="py-2 cursor-pointer border-secondary border-[1px] bg-white text-secondary px-6 rounded-md flex justify-center items-center"
        onClick={buttonAction}
        type={type}
      >
        {title}
      </button>
    );
  } else {
    return (
      <button
        className="py-2 cursor-pointer bg-secondary text-white px-6 rounded-md flex justify-center items-center"
        onClick={buttonAction}
        type={type}
      >
        {title}
      </button>
    );
  }
};

export default MyButton;
