import React from "react";

const Banner = () => {
  return (
    <div className="h-16 flex w-full items-center px-20 border-b-[1px] fixed top-0 left-0 z-10 bg-white">
      <p className="font-poppins w-max">
        <span className="text-secondary underline font-bold">
          Refer a friend
        </span>{" "}
        and get <span className="text-primary">10% </span> discount on your next
        meal
      </p>
    </div>
  );
};

export default Banner;
