import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../src/api";

const ArticleDetail = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getArticleById(article_id)
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
  }, [article_id]);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.msg}</p>;

  return (
    <div className="article-detail">
      {article && (
        <>
          <h1>{article.title}</h1>
          <p>By {article.author}</p>
          <p>Pubished on {new Date(article.created_at).toLocaleDateString()}</p>
          <img src={article.article_img_url} alt={article.title} />
          <div>{article.body}</div>
          <p>Votes: {article.votes}</p>
        </>
      )}
    </div>
  );
};

export default ArticleDetail;
