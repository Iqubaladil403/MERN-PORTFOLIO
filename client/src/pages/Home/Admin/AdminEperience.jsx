import { message, Modal } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, ReloadData, showLoading } from "../../../redux/rootSlice";

function AdminExperience() {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);
  const { experience } = portfolioData || {};

  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);
  const [company, setCompany] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [period, setPeriod] = useState("");

  // Handle state reset
  const handleCancel = () => {
    setShowAddEditModal(false);
    setSelectedItemForEdit(null);
    setCompany("");
    setTitle("");
    setDescription("");
    setPeriod("");
  };

  // Handle form submission
  async function handleSubmit(e) {
    e.preventDefault();
    if (!company || !title || !description || !period) {
      return message.error("Please fill out all fields before submitting.");
    }
    const objData = {
      company,
      title,
      description,
      period,
      ...(selectedItemForEdit && { _id: selectedItemForEdit._id }),
    };
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/portfolio/update-experience",
        objData
      );

      if (response.data.success) {
        message.success("Data Successfully Updated");
        setShowAddEditModal(false);
        dispatch(hideLoading());
        dispatch(ReloadData(true));
      } else {
        message.error(response.data.error);
      }
      handleCancel(); // Close modal and reset state
    } catch (error) {
      dispatch(hideLoading());
      message.error(error.message);
    }
  }
  const handleDelete = async (item) => {
    try {      
      dispatch(showLoading());
      const response = await axios.delete(
        "/api/portfolio/delete-experience",
        { data: { _id: item._id } }
      )
      ;

      if (response.data.success) {
        message.success("Experience deleted successfully!");
        setShowAddEditModal(false);
        dispatch(hideLoading());
        dispatch(ReloadData(true));
      } else {
        message.error(response.data.error);
      }
      handleCancel(); // Close modal and reset state
    } catch (error) {
      dispatch(hideLoading());
      message.error(error.message);
    }
  };

  return (
    <div>
      <div className="flex justify-end">
        <button
          className="bg-primary px-5 py-2 text-white rounded-sm"
          onClick={() => {
            setShowAddEditModal(true);
            setSelectedItemForEdit(null);
          }}
        >
          Add Experience
        </button>
      </div>

      <div className="grid grid-cols-4 sm:flex sm:flex-wrap">
        {experience?.map((exp) => (
          <div
            key={exp._id}
            className="shadow-lg border border-gray-300 p-4 m-4"
          >
            <p className="text-lg text-secondary font-bold">{exp.company}</p>
            <p className="text-sm text-red-700 font-bold">{exp.title}</p>
            <p className="text-sm font-semibold">{exp.period}</p>
            <p className="text-sm">{exp.description}</p>
            <div className="flex justify-end space-x-2">
              <button
                className="px-3 py-2 bg-gray-800 text-white rounded-lg"
                onClick={() => {
                  setShowAddEditModal(true);
                  setSelectedItemForEdit(exp);
                  setCompany(exp.company);
                  setTitle(exp.title);
                  setDescription(exp.description);
                  setPeriod(exp.period);
                }}
              >
                Edit
              </button>
              <button onClick={()=>handleDelete(exp)} className="px-3 py-2 bg-red-500 text-white rounded-lg">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        title={selectedItemForEdit ? "Edit Experience" : "Add Experience"}
        // visible={showAddEditModal}
        open={showAddEditModal}
        onCancel={handleCancel}
        footer={null}
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="font-semibold">Company:</label>
            <input
              className="w-full border border-gray-300 p-2 rounded mb-2"
              type="text"
              name="company"
              placeholder="Enter company name"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>
          <div>
            <label className="font-semibold">Title:</label>
            <input
              className="w-full border border-gray-300 p-2 rounded mb-2"
              type="text"
              name="title"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label className="font-semibold">Period:</label>
            <input
              className="w-full border border-gray-300 p-2 rounded mb-2"
              type="text"
              name="period"
              placeholder="Enter period e.g. 2019-2020"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
            />
          </div>
          <div>
            <label className="font-semibold">Description:</label>
            <textarea
              className="w-full border border-gray-300 p-2 rounded mb-2"
              name="description"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 bg-red-400 rounded-lg"
            >
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-cyan-400 rounded-lg">
              {selectedItemForEdit ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default AdminExperience;
