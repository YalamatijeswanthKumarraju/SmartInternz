// pages/Navbar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";

const NavigationBar = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const user = storedUser?.user;
  const role = user?.role;
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to={`/${role}`}>📚 SmartIntern</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            <Nav.Link as={Link} to={`/${role}`}>Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/token">Token</Nav.Link>

            {role === "student" && (
              <Nav.Link as={Link} to="/student/courses">Enrolled Courses</Nav.Link>
            )}

            {role === "teacher" && (
              <>
                <Nav.Link as={Link} to="/teacher/courses">My Courses</Nav.Link>
                <Nav.Link as={Link} to="/teacher">Create Course</Nav.Link>
              </>
            )}

            {role === "admin" && (
              <>
                <Nav.Link as={Link} to="/admin/users">Manage Users</Nav.Link>
                <Nav.Link as={Link} to="/admin/courses">Manage Courses</Nav.Link>
              </>
            )}
          </Nav>
          <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
