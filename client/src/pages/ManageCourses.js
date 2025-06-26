import React, { useEffect, useState } from "react";
import API from "../api";
import NavigationBar from "./Navbar";

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    const res = await API.get("/courses");
    setCourses(res.data);
  };

  const deleteCourse = async (id) => {
    await API.delete(`/admin/course/${id}`);
    fetchCourses();
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <>
      <NavigationBar />
      <div className="container mt-5">
        <h3 className="text-center">🗂️ Manage Courses</h3>
        {courses.length === 0 ? (
          <p className="text-center">No courses found.</p>
        ) : (
          <table className="table table-bordered">
            <thead>
              <tr><th>Title</th><th>Instructor</th><th>Category</th><th>Action</th></tr>
            </thead>
            <tbody>
              {courses.map(course => (
                <tr key={course._id}>
                  <td>{course.title}</td>
                  <td>{course.instructor}</td>
                  <td>{course.category}</td>
                  <td>
                    <button className="btn btn-danger btn-sm" onClick={() => deleteCourse(course._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default ManageCourses;
