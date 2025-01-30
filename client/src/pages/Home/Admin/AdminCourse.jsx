import { message, Modal } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, ReloadData, showLoading } from "../../../redux/rootSlice";

function AdminCourse() {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);
  const { course } = portfolioData || {};

  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageLink, setImageLink] = useState("");

  // Handle state reset
  const handleCancel = () => {
    setShowAddEditModal(false);
    setSelectedItemForEdit(null);
    setImageLink("");
    setTitle("");
    setDescription("");
  };

  // Handle form submission
  async function handleSubmit(e) {
    e.preventDefault();
    if (!imageLink || !title || !description) {
      return message.error("Please fill out all fields before submitting.");
    }

    const objData = {
      imageLink,
      title,
      description,
      ...(selectedItemForEdit && { _id: selectedItemForEdit._id }),
    };
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/portfolio/update-course",
        objData
      );
      console.log("res data is", response.data);

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
      console.log("item is", item._id);

      dispatch(showLoading());
      const response = await axios.delete(
        "/api/portfolio/delete-course",
        { data: { _id: item._id } }
      );
      if (response.data.success) {
        message.success("Course deleted successfully!");
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
          Add Course
        </button>
      </div>

      <div className="grid grid-cols-4 sm:flex sm:flex-wrap">
        {course?.map((Courses) => (
          <div
            key={Courses._id}
            className="shadow-lg border border-gray-300 p-4 m-4"
          >
            <p className="text-sm text-red-700 font-bold">{Courses.title}</p>

            <div className="flex justify-center h-[40vh] w-[40vh] object-cover">
              {Courses.image && Courses.image.endsWith(".lottie") ? (
                <dotlottie-player
                  src={Courses.image}
                  background="transparent"
                  speed="1"
                  loop
                  autoplay
                ></dotlottie-player>
              ) : (
                <img src={Courses.image || "default-image.jpg"} alt="course" />
              )}
            </div>

            <p className="text-sm">{Courses.description}</p>
            <div className="flex justify-end space-x-2">
              <button
                className="px-3 py-2 bg-gray-800 text-white rounded-lg"
                onClick={() => {
                  setShowAddEditModal(true);
                  setSelectedItemForEdit(Courses);
                  setImageLink(Courses.image);
                  setTitle(Courses.title);
                  setDescription(Courses.description);
                  setLink(Courses.link);
                }}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(Courses)}
                className="px-3 py-2 bg-red-500 text-white rounded-lg"
              >
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
            <label className="font-semibold">Image Link(URL):</label>
            <input
              className="w-full border border-gray-300 p-2 rounded mb-2"
              type="text"
              name="imageLink"
              placeholder="Enter image link"
              value={imageLink}
              onChange={(e) => setImageLink(e.target.value)}
            />
          </div>

          <div>
            <label className="font-semibold">Description:</label>
            <textarea
              className="w-full border border-gray-300 p-2 rounded mb-2"
              type="text"
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

export default AdminCourse;
