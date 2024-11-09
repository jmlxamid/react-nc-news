import React, { useEffect, useState } from "react";
import { getArticles } from "../src/api";
import { Link } from "react-router-dom";
import ArticleCard from "./ArticleCard";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";

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
  if (loading) return <Loading />;
  if (error) return <ErrorMessage msg={error.msg} />;

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
