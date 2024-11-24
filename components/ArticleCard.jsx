// ArticleCard.js

import React from "react";
import { Link } from "react-router-dom";
import "../src/index.css";

const ArticleCard = ({ article, onVoteUp, onVoteDown, isLoggedIn }) => {
  return (
    <div className="article-card">
      <Link to={`/articles/${article.article_id}`} className="article-link">
        {/* Display the article image above the title */}
        <img src={article.article_img_url} alt={article.title} />
        <h2 className="article-title">{article.title}</h2>
      </Link>
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
