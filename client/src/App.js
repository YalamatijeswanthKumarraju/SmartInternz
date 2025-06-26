import { Routes, Route, Navigate } from "react-router-dom";

// import pages
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import EnrolledCourses from "./pages/EnrolledCourses";
import TeacherDashboard from "./pages/TeacherDashboard";
import TeacherCourses from "./pages/TeacherCourses";
import AdminDashboard from "./pages/AdminDashboard";
import ManageUsers from "./pages/ManageUsers";
import ManageCourses from "./pages/ManageCourses";
import TokenViewer from "./pages/TokenViewer";

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
      {/* Layout wraps everything */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/token" element={<TokenViewer />} />

        {/* Student Routes */}
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

        {/* Teacher Routes */}
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
          path="/teacher/create"
          element={
            <RequireAuth role="teacher">
              <TeacherDashboard />
            </RequireAuth>
          }
        />

        {/* Admin Routes */}
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

        {/* Fallback route */}
        <Route
          path="*"
          element={
            user?.role ? <Navigate to={`/${user.role}`} /> : <Navigate to="/" />
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
