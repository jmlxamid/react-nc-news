import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getArticleById,
  getCommentsByArticleId,
  patchArticleVotes,
} from "../src/api";
import CommentList from "./CommentList";
import { UserContext } from "../src/contexts/UserContext";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";
import "../src/index.css";

const ArticleDetail = () => {
  const { article_id } = useParams();
  const { loggedInUser } = useContext(UserContext);
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

  const handleVote = (direction) => {
    if (!loggedInUser) {
      alert("Log In To Vote");
      return;
    }

    if (!article) return;

    const updatedVotes =
      direction === "up" ? article.votes + 1 : article.votes - 1;
    setArticle((prevArticle) => ({ ...prevArticle, votes: updatedVotes }));
    patchArticleVotes(article_id, direction === "up" ? 1 : -1).catch(
      (error) => {
        setArticle((prevArticle) => ({
          ...prevArticle,
          votes: prevArticle.votes,
        }));
        const errorMsg = error.response
          ? error.response.data.msg
          : "An unexpected error occurred";
        setError({ msg: errorMsg });
      }
    );
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage msg={error.msg} />;

  return (
    <div className="article-detail">
      {article && (
        <>
          <h1>{article.title}</h1>
          <p>By {article.author}</p>
          <p>
            Published on {new Date(article.created_at).toLocaleDateString()}
          </p>
          <img
            src={article.article_img_url}
            alt={article.title}
            className="article-image"
          />
          <div className="article-body">{article.body}</div>
          <div className="article-footer">
            <div className="article-vote-counter">
              <span>{article.votes}</span> Votes
            </div>
            {loggedInUser ? (
              <div className="vote-buttons">
                <button
                  className="vote-button upvote"
                  onClick={() => handleVote("up")}
                >
                  <i className="fa-solid fa-arrow-up"></i> Vote Up
                </button>
                <button
                  className="vote-button downvote"
                  onClick={() => handleVote("down")}
                >
                  <i className="fa-solid fa-arrow-down"></i> Vote Down
                </button>
              </div>
            ) : (
              <p className="login-message">Please log in to vote.</p>
            )}
          </div>
          <hr />
          <h2>
            <i className="fa-solid fa-comments"></i> Comments
          </h2>
          <CommentList article_id={article_id} />
        </>
      )}
    </div>
  );
};

export default ArticleDetail;
