const API_URL = import.meta.env.VITE_API_URL;
import { message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../../../redux/rootSlice";
function AdminContact() {

    const dispatch=useDispatch()
    // const { portfolioData } = useSelector((state) => state.root);
       const {portfolioData} =useSelector((state)=>state.root)
       console.log(portfolioData);
       
  // Initialize state with portfolio data if available
    const [emailLink, setEmailLink] = useState(portfolioData?.contact?.emailLink || "");
    const [fbLink, setFacebookLink] = useState(portfolioData?.contact?.fbLink || "");
    const [instaLink, setInstagramLink] = useState(portfolioData?.contact?.instaLink || "");
    const [githubLink, setGithubLink] = useState(portfolioData?.contact?.githubLink || "");
    const [linkedinLink, setLinkedInLink] = useState(portfolioData?.contact?.linkedinLink || "");
    const [name, setName] = useState(portfolioData?.contact?.name || "");
    const [phoneNO, setPhoneNO] = useState(portfolioData?.contact?.phoneNO || "");

    // Reset states when portfolioData changes
    useEffect(() => {
      if (portfolioData?.contact) {
        setEmailLink(portfolioData.contact.emailLink || "");
        setFacebookLink(portfolioData.contact.fbLink || "");
        setInstagramLink(portfolioData.contact.instaLink || "");
        setGithubLink(portfolioData.contact.githubLink || "");
        setLinkedInLink(portfolioData.contact.linkedinLink || "");
        setName(portfolioData.contact.name || "");
        setPhoneNO(portfolioData.contact.phoneNO || "");
      }
    }, [portfolioData]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "emailLink") {
        setEmailLink(value)
    }
    else if(name=== "fbLink"){
        setFacebookLink(value);
    }
    else if(name === "instaLink"){
        setInstagramLink(value)
    }
    else if(name=== "githubLink"){
        setGithubLink(value)
    }
    else if(name === "linkedinLink"){
        setLinkedInLink(value)
    }
    else if(name === "name"){
        setName(value)
    }
    else if(name === "phoneNO"){
        setPhoneNO(value)
    }

  };

  async function handleSubmit(e) {
    e.preventDefault()
    const objData={
        emailLink:emailLink,
        fbLink:fbLink,
        instaLink:instaLink,
        githubLink:githubLink,
        linkedinLink:linkedinLink,
        name:name,
        phoneNO:phoneNO,
        _id:portfolioData?.contact
    }
    console.log(objData);
    try {
        dispatch(showLoading())
        const response=await axios.post(`${API_URL}/api/portfolio/update-contact`,
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
              <label className="font-semibold">Email Link:</label>
              <input
                className="w-full border border-gray-300 p-2 rounded mb-2"
                type="text"
                name="emailLink"
                placeholder=" Enter email link"
                value={emailLink}
                onChange={handleChange}
              />
              <br />
            </div>

            <div>
              <label className="font-semibold">Facebook Link:</label>
              <input
                className="w-full border border-gray-300 p-2 rounded mb-2"
                type="text"
                name="fbLink"
                placeholder=" Enter facebook link"
                value={fbLink}
                onChange={handleChange}
              />
              <br />
            </div>

            <div>
              <label className="font-semibold">Instagram Link:</label>
              <input
                className="w-full border border-gray-300 p-2 rounded mb-2"
                type="text"
                name="instaLink"
                placeholder="Enter instagram link"
                value={instaLink}
                onChange={handleChange}
              />
              <br />
            </div>

            <div>
              <label className="font-semibold">Github Link:</label>
              <input
                className="w-full border border-gray-300 p-2 rounded mb-2"
                type="text"
                name="githubLink"
                placeholder="Enter github link"
                value={githubLink}
                onChange={handleChange}
              />
              <br />
            </div>

            <div>
              <label className="font-semibold">LinkedIn Link:</label>
              <input
                className="w-full border border-gray-300 p-2 rounded mb-2"
                type="text"
                name="linkedinLink"
                placeholder="Enter linkedin link"
                value={linkedinLink}
                onChange={handleChange}
              />
              <br />
            </div>
            <div>
              <label className="font-semibold">Name:</label>
              <input
                className="w-full border border-gray-300 p-2 rounded mb-2"
                type="text"
                name="name"
                placeholder="Enter name"
                value={name}
                onChange={handleChange}
              />
              <br />
            </div>
            <div>
              <label className="font-semibold">Phone No.:</label>
              <input
                className="w-full border border-gray-300 p-2 rounded mb-2"
                type="text"
                name="phoneNO"
                placeholder="Enter phone no."
                value={phoneNO}
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

export default AdminContact;
