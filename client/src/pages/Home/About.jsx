import React from "react";
import { useSelector } from "react-redux";
import SectionTitle from "../../component/SectionTitle";

function About() {
  const { portfolioData } = useSelector((state) => state.root);
  const { about } = portfolioData;

  const { description1, description2, skills, imageurl } = about;

  return (
    <>
      <SectionTitle title="About" />
      <div className="flex sm:flex-col sm:gap-2   gap-20 items-center  ">
        <div className="  h-[50vh] sm:gap  w-1/2 sm:w-full">
          <dotlottie-player
            src={imageurl}
            background="transparent"
            speed="1"
            loop
            autoplay
          ></dotlottie-player>
        </div>
        <div className="text-white  w-1/2 sm:w-full flex flex-col gap-20 sm:gap-8">
          <p>{description1 || ""}</p>
          <p>{description2 || ""}</p>
        </div>
      </div>
      <div className="py-10">
        <h1 className=" text-2xl text-tertiry">
          Here are a few technologies i've been working with recently :-
        </h1>
        <div className="flex  gap-8 py-5 overflow-x-scroll ">
          {skills.map((skill, index) => (
            <div className="border-2 border-tertiry py-3 px-5 ">
              <h1 className="text-tertiry">{skill}</h1>
            </div>
          )) || " "}
        </div>
      </div>
    </>
  );
}

export default About;

