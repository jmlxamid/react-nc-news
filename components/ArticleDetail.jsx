import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getArticleById,
  getCommentsByArticleId,
  patchArticleVotes,
} from "../src/api";
import CommentList from "./CommentList";
import { UserContext } from "../src/contexts/UserContext";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";
import "../src/index.css";

const ArticleDetail = () => {
  const { article_id } = useParams(); // Get article_id from URL
  const { loggedInUser } = useContext(UserContext); // Access logged-in user from context
  const [article, setArticle] = useState(null); // Store article data
  const [comments, setComments] = useState([]); // Store comments for the article
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch article and comments when the component mounts or article_id changes
  useEffect(() => {
    if (article_id) {
      Promise.all([
        getArticleById(article_id), // Fetch article data
        getCommentsByArticleId(article_id), // Fetch comments for the article
      ])
        .then(([articleData, commentsData]) => {
          setArticle(articleData); // Set article data
          setComments(commentsData); // Set comments data
          setLoading(false); // Set loading state to false
        })
        .catch((err) => {
          setLoading(false); // Set loading state to false if there's an error
          const errorMsg = err.response
            ? err.response.data.msg
            : "An unexpected error occurred"; // Get error message
          setError({ msg: errorMsg });
        });
    } else {
      setLoading(false); // Set loading to false if article_id is invalid
      setError({ msg: "Invalid article ID" });
    }
  }, [article_id]); // Re-fetch on article_id change

  // Handle voting logic (upvote/downvote)
  const handleVote = (direction) => {
    if (!loggedInUser) {
      alert("Log In To Vote");
      return;
    }

    if (!article) return;

    const updatedVotes =
      direction === "up" ? article.votes + 1 : article.votes - 1;
    setArticle((prevArticle) => ({ ...prevArticle, votes: updatedVotes })); // Update local state

    patchArticleVotes(article_id, direction === "up" ? 1 : -1) // Call API to update vote
      .catch((error) => {
        // Rollback in case of error
        setArticle((prevArticle) => ({
          ...prevArticle,
          votes: prevArticle.votes,
        }));
        const errorMsg = error.response
          ? error.response.data.msg
          : "An unexpected error occurred";
        setError({ msg: errorMsg });
      });
  };

  // Loading or error states
  if (loading) return <Loading />;
  if (error) return <ErrorMessage msg={error.msg} />;

  return (
    <div className="article-detail">
      {article && (
        <>
          {/* Article Header */}
          <h1>{article.title}</h1>
          <p>By {article.author}</p>
          <p>
            Published on {new Date(article.created_at).toLocaleDateString()}
          </p>
          <img
            src={article.article_img_url}
            alt={article.title}
            className="article-image"
          />
          <div className="article-body">{article.body}</div>

          {/* Voting Section */}
          <div className="article-footer">
            <div className="article-vote-counter">
              <span>{article.votes}</span> Votes
            </div>
            {loggedInUser ? (
              <div className="vote-buttons">
                <button
                  className="vote-button upvote"
                  onClick={() => handleVote("up")}
                >
                  <i className="fa-solid fa-arrow-up"></i> Vote Up
                </button>
                <button
                  className="vote-button downvote"
                  onClick={() => handleVote("down")}
                >
                  <i className="fa-solid fa-arrow-down"></i> Vote Down
                </button>
              </div>
            ) : (
              <p className="login-message">Please log in to vote.</p>
            )}
          </div>

          <hr />

          {/* Comments Section */}
          <h2>
            <i className="fa-solid fa-comments"></i> Comments
          </h2>
          {/* Render the CommentList component */}
          <CommentList article_id={article_id} loggedInUser={loggedInUser} />
        </>
      )}
    </div>
  );
};

export default ArticleDetail;
