import React, { useContext } from "react";
import { UserContext } from "../src/contexts/UserContext";

const UserDropdown = ({ users }) => {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);

  const handleUserSelection = (username) => {
    setLoggedInUser(username);
  };

  const handleLogout = () => {
    setLoggedInUser(null);
  };

  return (
    <div className="user-dropdown">
      <h2>Login</h2>
      {loggedInUser ? (
        <>
          <p role="status">Logged in as: {loggedInUser}</p>
          <button onClick={handleLogout}>Log Out</button>
        </>
      ) : (
        <select
          aria-label="Select a user to log in"
          onChange={(e) => handleUserSelection(e.target.value)}
          value={loggedInUser || ""}
        >
          <option value="">Select A User</option>
          {users.map((user) => (
            <option key={user.username} value={user.username}>
              {user.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default UserDropdown;
