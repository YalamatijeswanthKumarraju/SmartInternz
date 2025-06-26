import React, { useEffect, useState } from "react";
import API from "../api";

const StudentDashboard = () => {
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    try {
      const res = await API.get("/courses");
      setCourses(res.data);
    } catch (err) {
      console.error("Failed to fetch courses:", err);
    }
  };

  const enroll = async (courseId) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      await API.post("/courses/enroll", { userId: user.user._id, courseId });
      alert("Enrolled successfully!");
    } catch (err) {
      alert("Failed to enroll: " + err.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center">🎓 Student Dashboard</h2>
      <p className="text-center">Enroll in available courses below:</p>
      {courses.length === 0 ? (
        <p className="text-center">No courses available yet.</p>
      ) : (
        <div className="row">
          {courses.map((course) => (
            <div className="col-md-4 mb-3" key={course._id}>
              <div className="card">
                <div className="card-body">
                  <h5>{course.title}</h5>
                  <p>{course.description}</p>
                  <p><strong>Instructor:</strong> {course.instructor}</p>
                  <button className="btn btn-success w-100" onClick={() => enroll(course._id)}>Enroll</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
