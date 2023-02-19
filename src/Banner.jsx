import React from "react";

const Banner = () => {
  return (
    <div className="h-16 flex w-full items-center xl:px-20 lg:px-16 md:px-12 px-5 border-b-[1px] fixed top-0 left-0 z-10 bg-white">
      <p className="font-poppins w-max md:text-base text-xs">
        {/* <span className="text-secondary underline font-bold">
          Refer a friend
        </span>{" "}
        and get <span className="text-primary">10% </span> discount on your next
        meal */}
        <span className="text-accent font-medium">
          Ensure you provide accurate information when ordering help make your
          delivery easier.
        </span>
      </p>
    </div>
  );
};

export default Banner;
