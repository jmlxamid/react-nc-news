// ArticleCard.js
import React from "react";
import { Link } from "react-router-dom"; // Import the Link component for routing

const ArticleCard = ({ article, onVoteUp, onVoteDown, isLoggedIn }) => {
  return (
    <div className="article-card">
      <div className="article-header">
        {/* Wrap the article title in a Link for navigation */}
        <Link to={`/articles/${article.article_id}`} className="article-link">
          <img
            src={article.image_url}
            alt={article.title}
            className="article-image"
          />
          <h2>{article.title}</h2>
        </Link>
      </div>
      <p className="article-body">{article.body}</p>
      <div className="article-footer">
        {isLoggedIn ? (
          <div className="article-votes">
            <button className="vote-button upvote" onClick={onVoteUp}>
              <i className="fa-solid fa-arrow-up"></i>
            </button>
            <span>{article.votes}</span>
            <button className="vote-button downvote" onClick={onVoteDown}>
              <i className="fa-solid fa-arrow-down"></i>
            </button>
          </div>
        ) : (
          <p className="login-message">Please log in to vote</p>
        )}
      </div>
    </div>
  );
};

export default ArticleCard;
