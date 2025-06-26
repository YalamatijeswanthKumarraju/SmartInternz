import React, { useEffect, useState } from "react";
import API from "../api";
import NavigationBar from "./Navbar";

const EnrolledCourses = () => {
  const [courses, setCourses] = useState([]);
  const userId = JSON.parse(localStorage.getItem("user"))?.user?._id;

  useEffect(() => {
    const fetchCourses = async () => {
      const res = await API.get("/courses");
      const enrolled = res.data.filter(course =>
        course.enrolledUsers.includes(userId)
      );
      setCourses(enrolled);
    };
    fetchCourses();
  }, [userId]);

  return (
    <>
      <NavigationBar />
      <div className="container mt-5">
        <h3 className="text-center">📘 Enrolled Courses</h3>
        {courses.length === 0 ? (
          <p className="text-center">You are not enrolled in any courses yet.</p>
        ) : (
          <div className="row">
            {courses.map(course => (
              <div className="col-md-4 mb-3" key={course._id}>
                <div className="card p-3">
                  <h5>{course.title}</h5>
                  <p>{course.description}</p>
                  <small><strong>Instructor:</strong> {course.instructor}</small>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default EnrolledCourses;
