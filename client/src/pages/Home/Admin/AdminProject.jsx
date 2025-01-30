import { message, Modal } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, ReloadData, showLoading } from "../../../redux/rootSlice";

function AdminProject() {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);
  const { project } = portfolioData || {};

  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [link, setLink] = useState("");
  const [technologies, setTechnologies] = useState("");

  // Reset modal state
  const handleCancel = () => {
    setShowAddEditModal(false);
    setSelectedItemForEdit(null);
    setImageLink("");
    setTitle("");
    setDescription("");
    setLink("");
    setTechnologies("");
  };

  // Handle form submission
  async function handleSubmit(e) {
    e.preventDefault();
    if (!imageLink || !title || !description || !link || !technologies) {
      return message.error("Please fill out all fields before submitting.");
    }
    
    const objData = {
      imageLink,
      title,
      description,
      link,
      technologies: technologies.split(",").map((tech) => tech.trim()), // Ensuring array format
      ...(selectedItemForEdit && { _id: selectedItemForEdit._id }),
    };

    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/portfolio/update-project",
        objData
      );

      if (response.data.success) {
        message.success("Project Successfully Updated");
        dispatch(ReloadData(true));
      } else {
        message.error(response.data.error);
      }
      handleCancel(); // Reset and close modal
    } catch (error) {
      message.error(error.message);
    } finally {
      dispatch(hideLoading());
    }
  }

  // Handle project deletion
  const handleDelete = async (item) => {
    try {
      dispatch(showLoading());
      const response = await axios.delete(
        "/api/portfolio/delete-project",
        { data: { _id: item._id } }
      );

      if (response.data.success) {
        message.success("Project deleted successfully!");
        dispatch(ReloadData(true));
      } else {
        message.error(response.data.error);
      }
      handleCancel();
    } catch (error) {
      message.error(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };

  return (
    <div>
      {/* Add Project Button */}
      <div className="flex justify-end">
        <button
          className="bg-primary px-5 py-2 text-white rounded-sm"
          onClick={() => {
            setShowAddEditModal(true);
            setSelectedItemForEdit(null);
          }}
        >
          Add Project
        </button>
      </div>

      {/* Project List */}
      <div className="grid grid-cols-4 sm:flex sm:flex-wrap">
        {project?.map((proj) => (
          <div key={proj._id} className="shadow-lg border border-gray-300 p-4 m-4">
            <p className="text-sm text-red-700 font-bold">{proj.title}</p>

            <div className="flex justify-center h-[40vh] w-[40vh] object-cover">
              {proj.imageLink && proj.imageLink.endsWith(".lottie") ? (
                <dotlottie-player
                  src={proj.imageLink}
                  background="transparent"
                  speed="1"
                  loop
                  autoplay
                ></dotlottie-player>
              ) : (
                <img src={proj.imageLink || "default-image.jpg"} alt="project" />
              )}
            </div>

            <p className="text-sm font-semibold">{proj.link}</p>
            <p className="text-sm font-semibold break-words">
              {`Technologies: ${Array.isArray(proj.technologies) ? proj.technologies.join(", ") : ""}`}
            </p>
            <p className="text-sm">{proj.description}</p>

            <div className="flex justify-end space-x-2">
              <button
                className="px-3 py-2 bg-gray-800 text-white rounded-lg"
                onClick={() => {
                  setShowAddEditModal(true);
                  setSelectedItemForEdit(proj);
                  setImageLink(proj.imageLink);
                  setTitle(proj.title);
                  setDescription(proj.description);
                  setLink(proj.link);
                  setTechnologies(proj.technologies?.join(", ") || "");
                }}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(proj)}
                className="px-3 py-2 bg-red-500 text-white rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Adding/Editing Project */}
      <Modal
        title={selectedItemForEdit ? "Edit Project" : "Add Project"}
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
              placeholder="Enter image link"
              value={imageLink}
              onChange={(e) => setImageLink(e.target.value)}
            />
          </div>
          <div>
            <label className="font-semibold">Project Link:</label>
            <textarea
              className="w-full border border-gray-300 p-2 rounded mb-2"
              placeholder="Enter link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>
          <div>
            <label className="font-semibold">Technologies (comma-separated):</label>
            <textarea
              className="w-full border border-gray-300 p-2 rounded mb-2"
              placeholder="Enter technologies"
              value={technologies}
              onChange={(e) => setTechnologies(e.target.value)}
            />
          </div>
          <div>
            <label className="font-semibold">Description:</label>
            <textarea
              className="w-full border border-gray-300 p-2 rounded mb-2"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button type="button" onClick={handleCancel} className="px-4 py-2 bg-red-400 rounded-lg">
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

export default AdminProject;
