import React, { useState } from "react";
import API from "../api";

const TeacherDashboard = () => {
  const [course, setCourse] = useState({
    title: "",
    description: "",
    instructor: "",
    category: "",
  });

  const handleChange = (e) =>
    setCourse({ ...course, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/courses/create", course);
      alert("Course created successfully!");
      setCourse({ title: "", description: "", instructor: "", category: "" });
    } catch (err) {
      alert("Failed to create course: " + err.response?.data?.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">👨‍🏫 Teacher Dashboard</h2>
      <p className="text-center">Create a new course:</p>
      <form onSubmit={handleSubmit} className="w-50 mx-auto">
        <div className="mb-3">
          <label>Title</label>
          <input name="title" className="form-control" value={course.title} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Description</label>
          <textarea name="description" className="form-control" value={course.description} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Instructor</label>
          <input name="instructor" className="form-control" value={course.instructor} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Category</label>
          <input name="category" className="form-control" value={course.category} onChange={handleChange} required />
        </div>
        <button className="btn btn-primary w-100" type="submit">Create Course</button>
      </form>
    </div>
  );
};

export default TeacherDashboard;
