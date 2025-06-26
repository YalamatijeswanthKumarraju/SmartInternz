import React from "react";

const TokenViewer = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div style={{ padding: "20px" }}>
      <h2>🔐 Your Login Token</h2>
      {user?.token ? (
        <textarea
          readOnly
          style={{ width: "100%", height: "200px" }}
          value={user.token}
        />
      ) : (
        <p style={{ color: "red" }}>⚠️ No token found. Please log in first.</p>
      )}
    </div>
  );
};

export default TokenViewer;
