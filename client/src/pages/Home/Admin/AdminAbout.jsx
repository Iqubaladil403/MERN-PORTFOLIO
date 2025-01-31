const API_URL = import.meta.env.VITE_API_URL;

import { message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../../../redux/rootSlice";
function AdminAbout() {

    const dispatch=useDispatch()
    // const { portfolioData } = useSelector((state) => state.root);
       const {portfolioData} =useSelector((state)=>state.root)
       console.log(portfolioData?.about);
       
  // Initialize state with portfolio data if available
  const [description1, setDescription1] = useState(portfolioData?.about?.description1 || "");
  const [description2, setDescription2] = useState(portfolioData?.about?.description2 || "");
  const [imageurl, setImageurl] = useState(portfolioData?.about?.imageurl || "");
  const [skills, setSkills] = useState(portfolioData?.about?.skills || "");


    // Reset states when portfolioData changes
    useEffect(() => {
      if (portfolioData?.intro) {
        setDescription1(portfolioData.about.description1 || "");
        setDescription2(portfolioData.about.description2 || "");
        setImageurl(portfolioData.about.imageurl || "");
        setSkills(portfolioData.about.skills || "");
      }
    }, [portfolioData]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "description1") {
        setDescription1(value)
    }
    else if(name=== "description2"){
        setDescription2(value);
    }
    else if(name === "imageurl"){
        setImageurl(value)
    }
    else if(name=== "skills"){
        setSkills(value)
    }

  };

  async function handleSubmit(e) {
    e.preventDefault()
    const objData={
        description1:description1,
        description2:description2,
        imageurl,
        skills,
        _id:portfolioData?.about?._id
    }
    console.log(objData);
    try {
      const tempSkills = skills.split(",");
      objData.skills = tempSkills;
        dispatch(showLoading())
        const response=await axios.post(`${API_URL}/api/portfolio/update-about`,
            objData,

        )

        if(response.data.success){
            message.success("Data Successfully Updated")
        }
        else{
            message.error(response.data.error)
        }
        dispatch(hideLoading())
    } catch (error) {
        dispatch(hideLoading())
        message.error(error.message)
    }
  }
  return (
    <>
      <div className="p-5 max-w-3xl mx-auto sm:max-w-full sm:p-2 ">
        <form onSubmit={handleSubmit} className="space-y-5 ">
          <div className="p-5">
            <div>
              <label className="font-semibold">Description 1:</label>
              <textarea
                className="w-full border border-gray-300 p-2 rounded mb-2"
                type="text"
                name="description1"
                placeholder=" Description 1"
                value={description1}
                onChange={handleChange}
              />
              <br />
            </div>

            <div>
              <label className="font-semibold">Description 2:</label>
              <textarea
                className="w-full border border-gray-300 p-2 rounded mb-2"
                type="text"
                name="description2"
                placeholder=" Description 2"
                value={description2}
                onChange={handleChange}
              />
              <br />
            </div>

            <div>
              <label className="font-semibold">Image url(lottie image url):</label>
              <input
                className="w-full border border-gray-300 p-2 rounded mb-2"
                type="text"
                name="imageurl"
                placeholder="Enter image url"
                value={imageurl}
                onChange={handleChange}
              />
              <br />
            </div>

            <div>
              <label className="font-semibold">Skills:</label>
              <input
                className="w-full border border-gray-300 p-2 rounded mb-2"
                type="text"
                name="skills"
                placeholder=" Enter skills"
                value={skills}
                onChange={handleChange}
              />
              <br />
            </div>
            <div>
              <button
                className="px-8 py-3 bg-cyan-400 rounded-lg mb-2"
                type="submit"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default AdminAbout;
