import React from "react";
import { useSelector } from "react-redux";

function Intro() {
  const{loading, portfolioData}=useSelector(state=>state.root)
  const{intro}=portfolioData;
  const{welcomeText,firstName, lastName, caption, description}=intro;
  return (
    <>
      <div className="flex sm:flex-col sm:-mt-16 pt-8">
      <div className="h-[80vh] lg:w-full  flex flex-col  text-white justify-center gap-8 sm:gap-2">
        <h1 className="text-white text-3xl sm:text-lg ">{welcomeText || ""}</h1>
        <h1 className="text-7xl sm:text-3xl text-secondary font-semibold">
          {firstName || ""} {lastName || ""}
        </h1>
        <h1 className="text-6xl sm:text-2xl text-white font-semibold">
          {caption || ""}
        </h1>
        <h1 className=" text-white w-2/3 sm:w-full">
         {description || ""}
        </h1>
        <button className=" border-2 border-tertiry text-tertiry w-36 py-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          Get Started
        </button>
      </div>
      <div className="sm:-mt-32">
      <img className=" rounded-full object-cover" src="Adils.png"/>
      </div>
      </div>
    </>
  );
}

export default Intro;
