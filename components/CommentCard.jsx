import React from "react";
import "../src/index.css";

const CommentCard = ({ comment, onVoteUp, onVoteDown }) => {
  return (
    <div className="comment-card">
      <div className="comment-header">
        <i className="fa-solid fa-comments comment-icon"></i>
        <strong>{comment.author}</strong> says:
      </div>
      <p className="comment-body">{comment.body}</p>
      <div className="comment-footer">
        <div className="comment-votes">
          <button className="vote-button upvote" onClick={onVoteUp}>
            <i className="fa-solid fa-arrow-up"></i>
          </button>
          <span>{comment.votes}</span>
          <button className="vote-button downvote" onClick={onVoteDown}>
            <i className="fa-solid fa-arrow-down"></i>
          </button>
        </div>
        <p className="comment-date">
          Posted on {new Date(comment.created_at).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default CommentCard;
