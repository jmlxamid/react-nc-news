import React from "react";
import { deleteComment } from "../src/api"; // Import the deleteComment API
import "../src/index.css";

const CommentCard = ({ comment, loggedInUser, setComments }) => {
  // Handle deleting a comment
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      deleteComment(comment.comment_id) // Call the deleteComment API
        .then(() => {
          // Remove the deleted comment from the state
          setComments((prevComments) =>
            prevComments.filter((c) => c.comment_id !== comment.comment_id)
          );
        })
        .catch(() => {
          alert("Failed to delete comment.");
        });
    }
  };

  return (
    <div className="comment-card">
      <div className="comment-header">
        {/* Displaying the avatar */}
        <img
          src={comment.avatar_url}
          alt={`${comment.author}'s avatar`}
          className="comment-avatar"
        />
        <div>
          <i className="fa-solid fa-comments comment-icon"></i>
          <strong>{comment.author}</strong> says:
        </div>
      </div>
      <p className="comment-body">{comment.body}</p>
      <div className="comment-footer">
        <div className="comment-votes">
          <button className="vote-button upvote" onClick={() => {}}>
            <i className="fa-solid fa-arrow-up"></i>
          </button>
          <span>{comment.votes}</span>
          <button className="vote-button downvote" onClick={() => {}}>
            <i className="fa-solid fa-arrow-down"></i>
          </button>
        </div>
        <p className="comment-date">
          Posted on {new Date(comment.created_at).toLocaleDateString()}
        </p>
        {/* Render delete button only if the logged-in user is the author */}
        {loggedInUser === comment.author && (
          <button className="delete-button" onClick={handleDelete}>
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default CommentCard;
