import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import TokenViewer from "./pages/TokenViewer";
import EnrolledCourses from "./pages/EnrolledCourses";
import TeacherCourses from "./pages/TeacherCourses";
import ManageUsers from "./pages/ManageUsers";
import ManageCourses from "./pages/ManageCourses";
import Layout from "./pages/Layout"; // ✅ import layout

const App = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const user = storedUser?.user;
  const token = storedUser?.token;

  const RequireAuth = ({ role, children }) => {
    if (!user || !token) return <Navigate to="/login" />;
    if (user.role !== role) return <Navigate to={`/${user.role}`} />;
    return children;
  };

  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/token" element={<TokenViewer />} />

      <Route element={<Layout />}> {/* ✅ Global navbar wrapper */}
        <Route
          path="/student"
          element={
            <RequireAuth role="student">
              <StudentDashboard />
            </RequireAuth>
          }
        />
        <Route
          path="/student/courses"
          element={
            <RequireAuth role="student">
              <EnrolledCourses />
            </RequireAuth>
          }
        />
        <Route
          path="/teacher"
          element={
            <RequireAuth role="teacher">
              <TeacherDashboard />
            </RequireAuth>
          }
        />
        <Route
          path="/teacher/courses"
          element={
            <RequireAuth role="teacher">
              <TeacherCourses />
            </RequireAuth>
          }
        />
        <Route
          path="/admin"
          element={
            <RequireAuth role="admin">
              <AdminDashboard />
            </RequireAuth>
          }
        />
        <Route
          path="/admin/users"
          element={
            <RequireAuth role="admin">
              <ManageUsers />
            </RequireAuth>
          }
        />
        <Route
          path="/admin/courses"
          element={
            <RequireAuth role="admin">
              <ManageCourses />
            </RequireAuth>
          }
        />
      </Route>

      <Route
        path="*"
        element={
          user?.role ? <Navigate to={`/${user.role}`} /> : <Navigate to="/login" />
        }
      />
    </Routes>
  );
};

export default App;
