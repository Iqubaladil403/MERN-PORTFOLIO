import React, { useState } from "react";
import { useSelector } from "react-redux";
import SectionTitle from "../../component/SectionTitle";

function Courses() {
  const { portfolioData } = useSelector((state) => state.root);
  const { course } = portfolioData;
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);

  return (
    <>
      <div>
        <SectionTitle title="Courses" />
        <div className="flex gap-10 items-start sm:flex-col">
          {/* Courses List */}
          <div className="flex flex-col sm:flex-row sm:overflow-x-scroll sm:w-full lg:max-h-[400px] lg:max-w-2/3 lg:overflow-y-auto gap-5 border-l-4 w-1/2 border-[#176272]">
            {course.map((courses, index) => (
              <div
                key={courses.id}
                onClick={() => setSelectedItemIndex(index)}
                className="cursor-pointer"
              >
                <h1
                  className={`text-xl p-2 font-semibold px-10 ${
                    selectedItemIndex === index
                      ? "text-tertiry border-tertiry border-l-4 -ml-1 bg-[#1a7f5a5f]"
                      : "text-white"
                  }`}
                >
                  {courses.title}
                </h1>
              </div>
            ))}
          </div>

          {/* Course Details */}
          <div className="flex flex-col sm:gap-6 gap-4 w-1/2   lg:w-full">
            <div className="flex flex-col gap-4 sm:items-center">
              {/* Course Title */}
              <h1 className="text-secondary text-3xl">
                {course[selectedItemIndex].title}
              </h1>

              {/* Course Description */}
              <p className="text-white text-xl">
                {course[selectedItemIndex].description}
              </p>
            </div>

            {/* Course Image */}
            <div className="flex justify-center h-[50vh]">
              <dotlottie-player
                key={course[selectedItemIndex]?._id}
                src={course[selectedItemIndex].image || " "}
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

export default Courses;

