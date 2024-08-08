import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById, getCommentsByArticleId } from "../src/api";
import CommentList from "./CommentList";

const ArticleDetail = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (article_id) {
      Promise.all([
        getArticleById(article_id),
        getCommentsByArticleId(article_id),
      ])
        .then(([articleData, commentsData]) => {
          setArticle(articleData);
          setComments(commentsData);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          const errorMsg = err.response
            ? err.response.data.msg
            : "An unexpected error occurred";
          setError({ msg: errorMsg });
        });
    } else {
      setLoading(false);
      setError({ msg: "Invalid article ID" });
    }
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
          <hr />
          <h2>Comments</h2>
          <CommentList article_id={article_id} />
        </>
      )}
    </div>
  );
};

export default ArticleDetail;
