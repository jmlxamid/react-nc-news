import React from "react";

const ArticleCard = ({ title, content }) => {
  return (
    <div className="article-card">
      <h2>{title}</h2>
      <p>{content}</p>
    </div>
  );
};

export default ArticleCard;
