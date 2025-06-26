import React, { useEffect, useState } from "react";
import API from "../api";
import NavigationBar from "./Navbar";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await API.get("/admin/users");
    setUsers(res.data);
  };

  const deleteUser = async (id) => {
    await API.delete(`/admin/user/${id}`);
    fetchUsers(); // refresh list
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <NavigationBar />
      <div className="container mt-5">
        <h3 className="text-center">👤 Manage Users</h3>
        {users.length === 0 ? (
          <p className="text-center">No users found.</p>
        ) : (
          <table className="table table-bordered">
            <thead>
              <tr><th>Name</th><th>Email</th><th>Role</th><th>Action</th></tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button className="btn btn-danger btn-sm" onClick={() => deleteUser(user._id)}>Delete</button>
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

export default ManageUsers;
