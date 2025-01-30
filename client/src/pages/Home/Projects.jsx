import React, { useState } from "react";
import { useSelector } from "react-redux";
import SectionTitle from "../../component/SectionTitle";
function Projects() {
  const { portfolioData } = useSelector((state) => state.root);
  const { project } = portfolioData;
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  return (
    <>
      <div>
        <SectionTitle title="Project" />
        <div className="flex gap-10 items-center sm:flex-col">
          <div className="flex flex-col sm:flex-row sm:gap-0 sm:overflow-x-scroll sm:w-full lg:max-h-[400px] lg:overflow-y-auto sm:h-auto  gap-5  border-l-4 w-1/2 border-[#176272] ">
            {project.map((proj, index) => (
              <div
                onClick={() => {
                  setSelectedItemIndex(index);
                }}
                className=" cursor-pointer "
              >
                <h1
                  className={`text-xl p-2 font-semibold px-10   ${
                    selectedItemIndex === index
                      ? " text-tertiry  border-tertiry border-l-4 -ml-1 inline-block bg-[#1a7f5a5f] "
                      : "text-white"
                  }`}
                >
                  {" "}
                  {proj.title || " "}
                </h1>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-4 lg:w-full sm:items-center">
            {/* Project Title */}
            <h1 className="text-secondary text-3xl">
              {project[selectedItemIndex].title || " "}
            </h1>

            {/* Project Link */}
            <h1 className="text-white text-xl break-all overflow-hidden">
              <a href="">{project[selectedItemIndex].link || " "}</a>
            </h1>

            {/* Technologies List */}
            <div className="flex flex-wrap gap-2">
              {project[selectedItemIndex].technologies.map((tech, index) => (
                <span
                  key={index}
                  className="bg-tertiry text-black px-3 py-1 rounded-lg text-sm"
                >
                  {tech || " "}
                </span>
              ))}
            </div>

            {/* Project Description */}
            <p className="text-white text-xl">
              {project[selectedItemIndex].description || " "}
            </p>

            {/* Project Image */}
            <div className="flex justify-center h-[50vh]">
              <dotlottie-player
              key={project[selectedItemIndex]?._id} 
                src={project[selectedItemIndex].imageLink || " "}
                background="transparent"
                speed="1"
                loop
                autoplay
              ></dotlottie-player>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Projects;

