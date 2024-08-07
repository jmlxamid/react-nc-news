import React, { useEffect, useState } from "react";
import { getArticles } from "../src/api";
import { Link } from "react-router-dom";
import ArticleCard from "./ArticleCard";

const ArticleList = () => {
  const [article, setArticle] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getArticles()
      .then((data) => {
        setArticle(data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(
          err.response
            ? err.response.data
            : { msg: "An unexpected error occurred" }
        );
      });
  }, []);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.msg}</p>;

  return (
    <div className="article-list">
      <h1>All Articles</h1>
      <ul>
        {article.map((article) => (
          <ArticleCard key={article.article_id} article={article} />
        ))}
      </ul>
    </div>
  );
};

export default ArticleList;
