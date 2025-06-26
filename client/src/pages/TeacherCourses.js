import React, { useEffect, useState } from "react";
import API from "../api";
import NavigationBar from "./Navbar";

const TeacherCourses = () => {
  const [myCourses, setMyCourses] = useState([]);
  const teacherName = JSON.parse(localStorage.getItem("user"))?.user?.name;

  useEffect(() => {
    const fetchCourses = async () => {
      const res = await API.get("/courses");
      const mine = res.data.filter(course => course.instructor === teacherName);
      setMyCourses(mine);
    };
    fetchCourses();
  }, [teacherName]);

  return (
    
      <div className="container mt-5">
        <h3 className="text-center">👨‍🏫 My Created Courses</h3>
        {myCourses.length === 0 ? (
          <p className="text-center">No courses created yet.</p>
        ) : (
          <div className="row">
            {myCourses.map(course => (
              <div className="col-md-4 mb-3" key={course._id}>
                <div className="card p-3">
                  <h5>{course.title}</h5>
                  <p>{course.description}</p>
                  <small><strong>Category:</strong> {course.category}</small>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    
  );
};

export default TeacherCourses;
