import React from "react";
import { Link } from "react-router-dom";

const ArticleCard = ({ article }) => {
  return (
    <li className="article-card" key={article.article_id}>
      <h2>
        <Link to={`/articles/${article.article_id}`}>{article.title}</Link>
      </h2>
      <p>By {article.author}</p>
      <p>Published on {new Date(article.created_at).toLocaleDateString()}</p>
    </li>
  );
};

export default ArticleCard;
