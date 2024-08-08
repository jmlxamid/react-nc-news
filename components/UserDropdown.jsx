import React, { useContext, useState } from "react";
import { UserContext } from "../src/contexts/UserContext";

const UserDropdown = ({ users }) => {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);

  const handleLogin = (username) => {
    setLoggedInUser(username);
  };
  return (
    <div>
      <h2>Login</h2>
      <select
        onChange={(e) => handleLogin(e.target.value)}
        value={loggedInUser || ""}
      >
        <option value="">Select A User</option>
        {users.map((user) => (
          <option key={user.username} value={user.username}>
            {user.name}
          </option>
        ))}
      </select>
      {loggedInUser && <p>Logged in as: {loggedInUser}</p>}
    </div>
  );
};

export default UserDropdown;
