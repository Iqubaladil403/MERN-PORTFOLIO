import { message } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import { FaEnvelope, FaGithub, FaInstagram, FaLinkedin, FaPhoneAlt } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/rootSlice';
function Contact() {
  const dispatch=useDispatch()
  const[names,setName]=useState('')
  const[email,setEmail]=useState('')
  const[messages,setMessage]=useState('')
  const handleSubmit=async(e)=>{
    e.preventDefault()
    if(!names || !email || !messages){
      return message.error("Please fill out all fields before submitting.");
    } 
    const data={
      names,
      email,
      messages
    }
    try {
      dispatch(showLoading())
      const response=await axios.post("http://localhost:5000/api/portfolio/send-email",data);
      dispatch(hideLoading());
      if(response.data.success){
        message.success("Email Sent Successfully");
        setName('');
        setEmail('');
        setMessage('');
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error("Error Sending Email");
    }
  }
  const { portfolioData } = useSelector((state) => state.root);
  const { contact } = portfolioData;
  const { name, instaLink, emailLink, githubLink, linkedinLink, phoneNO } = contact;

  return (
    <div className='flex sm:flex-col rounded-lg bg-gradient-to-br from-[#0A192F] to-[#054e68] gap-6 sm:gap-10 p-6'>
      {/* Left Section - Contact Form */}
      <div className='sm:w-full'>
        <h2 className="text-4xl font-semibold text-[#F97316] mb-4">Get in Touch</h2>
        <p className="text-[#B0B0B0] mb-6">
          Have any questions or want to collaborate? Feel free to reach out by filling out the form below.
        </p>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-[#B0B0B0]">Name</label>
            <input
              type="text"
              placeholder="Your Name"
              name='names'
              value={names}
              onChange={(e)=>setName(e.target.value)}
              className="input input-bordered w-full text-black rounded-xl border-2 border-[#F97316] focus:outline-none focus:ring-2 focus:ring-[#54D6BB] p-3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#B0B0B0]">Email</label>
            <input
              type="email"
              placeholder="Your Email"
              name='email'
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="input input-bordered w-full text-black rounded-xl border-2 border-[#F97316] focus:outline-none focus:ring-2 focus:ring-[#54D6BB] p-3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#B0B0B0]">Message</label>
            <textarea
              placeholder="Your Message"
              name='messages'
              value={messages}
              onChange={(e)=>setMessage(e.target.value)}
              className="textarea textarea-bordered w-full text-black rounded-xl border-2 border-[#F97316] focus:outline-none focus:ring-2 focus:ring-[#54D6BB] p-3"
            ></textarea>
          </div>

          <button className="btn btn-primary py-2 rounded-lg px-12 bg-[#F97316] hover:bg-[#FF6A3D] text-white transition duration-300 transform hover:scale-105">
            Submit
          </button>
        </form>
      </div>

      {/* Right Section - Developer Contact Details */}
      <div className="sm:w-full bg-[#54D6BB] text-[#0A192F] lg:p-8 sm:px-4 flex flex-col justify-between rounded-lg shadow-lg">
        <div className='w-full'>
          <h2 className="text-4xl font-semibold mb-4">{name}</h2>
          <p className="text-lg mb-6">Feel free to connect with me via the following platforms:</p>

          <div className="space-y-4 break-all">
            <div className="flex items-center gap-3">
              <FaPhoneAlt className="text-3xl flex-shrink-0" />
              <span className="text-lg">{phoneNO}</span>
            </div>
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-3xl flex-shrink-0" />
              <span className="text-lg">{emailLink}</span>
            </div>
            <div className="flex items-center gap-3">
              <FaLinkedin className="text-3xl flex-shrink-0" />
              <a
                href={linkedinLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text-lg"
              >
                LinkedIn
              </a>
            </div>
            <div className="flex items-center gap-3">
              <FaGithub className="text-3xl flex-shrink-0" />
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text-lg"
              >
                GitHub
              </a>
            </div>
            <div className="flex items-center gap-3">
              <FaInstagram className="text-3xl flex-shrink-0" />
              <a
                href={instaLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text-lg"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <p className="text-sm text-center mt-10 text-[#0A192F]">
          © {new Date().getFullYear()} {name}. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default Contact;
