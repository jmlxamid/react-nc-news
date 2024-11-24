import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../src/contexts/UserContext";
import { getUserByUsername } from "../src/api";
import "../src/index.css";

const UserPage = () => {
  const { username } = useParams();
  const { loggedInUser } = useContext(UserContext);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (username) {
      setLoading(true);
      getUserByUsername(username)
        .then((data) => {
          setUserData(data);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          const errorMsg = error.response
            ? error.response.data.msg
            : "An unexpected error occurred";
          setError({ msg: errorMsg });
        });
    } else {
      setLoading(false);
      setError({ msg: "Invalid username" });
    }
  }, [username]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.msg}</p>;

  return (
    <div className="user-page">
      {userData && (
        <>
          <img
            src={userData.avatar_url}
            alt={`${userData.username}'s avatar`}
          />
          <h2>{userData.username}</h2>
          <p>Joined on {new Date(userData.joined_at).toLocaleDateString()}</p>
          <p>Bio: {userData.bio || "No bio available"}</p>

          <h3>Articles by {userData.username}</h3>

          <ul>
            {userData.articles.map((article) => (
              <li key={article.article_id}>
                <Link to={`/articles/${article.article_id}`}>
                  {article.title}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default UserPage;
