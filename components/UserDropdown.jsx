import React, { useContext } from "react";
import { UserContext } from "../src/contexts/UserContext";
import "../src/index.css";

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
      <h2 className="user-dropdown__title">Login</h2>
      {loggedInUser ? (
        <div className="user-dropdown__logged-in">
          <p className="user-dropdown__status" role="status">
            Logged in as:{" "}
            <span className="user-dropdown__username">{loggedInUser}</span>
          </p>
          <button
            className="user-dropdown__logout-button"
            onClick={handleLogout}
          >
            Log Out
          </button>
        </div>
      ) : (
        <div className="user-dropdown__login">
          <select
            className="user-dropdown__select"
            aria-label="Select a user to log in"
            onChange={(e) => handleUserSelection(e.target.value)}
            value={loggedInUser || ""}
          >
            <option value="" className="user-dropdown__option">
              Select A User
            </option>
            {users.map((user) => (
              <option
                key={user.username}
                value={user.username}
                className="user-dropdown__option"
              >
                {user.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
