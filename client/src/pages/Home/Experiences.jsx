import React, { useState } from "react";
import { useSelector } from "react-redux";
import SectionTitle from "../../component/SectionTitle";
function Experiences() {
  const {portfolioData} =useSelector(state=>state.root);
  const {experience}=portfolioData;
  
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  return (
    <>
      <div>
        <SectionTitle title="Experiences" />
        <div className="flex gap-10 items-center sm:flex-col">
        <div className="flex lg:max-h-[350px] lg:overflow-y-auto flex-col sm:flex-row sm:gap-0 sm:overflow-x-scroll sm:w-full  gap-5  border-l-4 w-1/2 border-[#176272] ">
          {experience.map((exe, index) => (
            <div
              onClick={() => {
                setSelectedItemIndex(index);
              }}
              className=" cursor-pointer "
            >
              <h1
                className={`text-xl p-2 font-semibold px-10  ${
                  selectedItemIndex === index
                    ? " text-tertiry  border-tertiry border-l-4 -ml-1 inline-block bg-[#1a7f5a5f] "
                    : "text-white"
                }`}
              >
                {" "}
                {exe.period}
              </h1>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-5  w-full" >
          <h1 className=" text-secondary text-3xl ">{experience[selectedItemIndex].title}</h1>
          <h1 className=" text-tertiry text-2xl">{experience[selectedItemIndex].company}</h1>
          <p className=" text-white text-xl">{experience[selectedItemIndex].description}</p>
        </div>
        </div>
      </div>
    </>
  );
}

export default Experiences;
