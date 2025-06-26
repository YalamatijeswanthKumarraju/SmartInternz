import React from "react";
import { useNavigate } from "react-router-dom";


const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container text-center mt-5">
      <h1 className="mb-4">📚 Welcome to SmartIntern</h1>
      <div className="d-flex justify-content-center gap-4">
        <div className="card p-4" style={{ width: "200px" }}>
          <h5>Already have an account?</h5>
          <button className="btn btn-primary mt-3" onClick={() => navigate("/login")}>Login</button>
        </div>
        <div className="card p-4" style={{ width: "200px" }}>
          <h5>New here?</h5>
          <button className="btn btn-success mt-3" onClick={() => navigate("/register")}>Register</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
