const API_URL = import.meta.env.VITE_API_URL;
import { message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../../../redux/rootSlice";
function AdminIntro() {

    const dispatch=useDispatch()
    // const { portfolioData } = useSelector((state) => state.root);
       const {portfolioData} =useSelector((state)=>state.root)
       
  // Initialize state with portfolio data if available
  const [welcomeText, setWelcomeText] = useState(portfolioData?.intro?.welcomeText || "");
  const [fName, setFName] = useState(portfolioData?.intro?.firstName || "");
  const [lName, setLName] = useState(portfolioData?.intro?.lastName || "");
  const [caption, setCaption] = useState(portfolioData?.intro?.caption || "");
  const [description, setDescription] = useState(portfolioData?.intro?.description || "");

    // Reset states when portfolioData changes
    useEffect(() => {
      if (portfolioData?.intro) {
        setWelcomeText(portfolioData.intro.welcomeText || "");
        setFName(portfolioData.intro.firstName || "");
        setLName(portfolioData.intro.lastName || "");
        setCaption(portfolioData.intro.caption || "");
        setDescription(portfolioData.intro.description || "");
      }
    }, [portfolioData]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "fName") {
        setFName(value)
    }
    else if(name=== "lName"){
        setLName(value);
    }
    else if(name === "welcomeText"){
        setWelcomeText(value)
    }
    else if(name=== "caption"){
        setCaption(value)
    }
    else if(name === "description"){
        setDescription(value)
    }

  };

  async function handleSubmit(e) {
    e.preventDefault()
    const objData={
        welcomeText:welcomeText,
        firstName:fName,
        lastName:lName,
        caption,
        description,
        _id:portfolioData?.intro?._id
    }
    try {
        dispatch(showLoading())
        const response=await axios.post(`${API_URL}api/portfolio/update-intro`,
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
              <label className="font-semibold">Welcome Text:</label>
              <input
                className="w-full border border-gray-300 p-2 rounded mb-2"
                type="text"
                name="welcomeText"
                placeholder=" Welcome Text"
                value={welcomeText}
                onChange={handleChange}
              />
              <br />
            </div>

            <div>
              <label className="font-semibold">First Name:</label>
              <input
                className="w-full border border-gray-300 p-2 rounded mb-2"
                type="text"
                name="fName"
                placeholder=" Enter first name"
                value={fName}
                onChange={handleChange}
              />
              <br />
            </div>

            <div>
              <label className="font-semibold">Last Name:</label>
              <input
                className="w-full border border-gray-300 p-2 rounded mb-2"
                type="text"
                name="lName"
                placeholder="Enter last name"
                value={lName}
                onChange={handleChange}
              />
              <br />
            </div>

            <div>
              <label className="font-semibold">Caption:</label>
              <input
                className="w-full border border-gray-300 p-2 rounded mb-2"
                type="text"
                name="caption"
                placeholder="Enter caption"
                value={caption}
                onChange={handleChange}
              />
              <br />
            </div>

            <div>
              <label className="font-semibold">Description:</label>
              <textarea
                className="w-full border border-gray-300 p-2 rounded mb-2"
                type="text"
                name="description"
                placeholder="Enter description"
                value={description}
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

export default AdminIntro;
