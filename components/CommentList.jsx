import React, { useEffect, useState } from "react";
import { getCommentsByArticleId } from "../src/api";
import CommentCard from "./CommentCard";

const CommentList = ({ article_id }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (article_id) {
      getCommentsByArticleId(article_id)
        .then((data) => {
          setComments(data);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          const errorMsg = error.response
            ? error.response.data.msg
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
    <div className="comment-list">
      {comments.map((comment) => (
        <CommentCard key={comment.created_at} comment={comment} />
      ))}
    </div>
  );
};

export default CommentList;
