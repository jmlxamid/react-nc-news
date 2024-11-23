// ArticleList.jsx
import React, { useEffect, useState } from "react";
import { getArticles } from "../src/api";
import ArticleCard from "./ArticleCard";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";
import "../src/index.css";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getArticles()
      .then((data) => {
        setArticles(data);
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

  if (loading) return <Loading />;
  if (error) return <ErrorMessage msg={error.msg} />;

  return (
    <div className="article-list">
      <h1>Articles</h1>
      <div className="article-grid">
        {" "}
        {/* This is where grid styles apply */}
        {articles.map((article) => (
          <ArticleCard key={article.article_id} article={article} />
        ))}
      </div>
    </div>
  );
};

export default ArticleList;
