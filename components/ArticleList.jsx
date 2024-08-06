import React, { useEffect, useState } from "react";
import { getArticles } from "../src/api";
import { Link } from "react-router-dom";

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
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.msg}</p>;

  return (
    <div className="article-list">
      <h1>All Articles</h1>
      <ul>
        {articles.map((article) => (
          <li className="article-card" key={article.article_id}>
            <h2>
              <Link to={`/articles/${article.article_id}`}>
                {article.title}
              </Link>
            </h2>
            <p>By {article.author}</p>
            <p>
              Pubished on {new Date(article.created_at).toLocaleDateString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArticleList;
