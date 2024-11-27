import React, { useEffect, useState } from "react";
import { getCommentsByArticleId, postComment } from "../src/api"; // Import API calls
import CommentCard from "./CommentCard"; // To display individual comments
import Loading from "./Loading"; // Loading spinner component
import ErrorMessage from "./ErrorMessage"; // Error message component
import "../src/index.css"; // Styling

const CommentList = ({ article_id, loggedInUser }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState(""); // Track new comment text
  const [isSubmitting, setIsSubmitting] = useState(false); // Track form submission state

  // Fetch comments when article_id or loggedInUser changes
  useEffect(() => {
    if (article_id) {
      setLoading(true);
      getCommentsByArticleId(article_id)
        .then((data) => {
          setComments(data); // Set fetched comments
          setLoading(false); // Stop loading
        })
        .catch((error) => {
          setLoading(false);
          const errorMsg = error.response
            ? error.response.data.msg
            : "An unexpected error occurred";
          setError({ msg: errorMsg }); // Set error state
        });
    } else {
      setLoading(false);
      setError({ msg: "Invalid article ID" }); // Handle invalid article ID
    }
  }, [article_id]);

  // Handle submitting a new comment
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return; // Prevent empty comment submission

    setIsSubmitting(true); // Disable submit button
    postComment(article_id, loggedInUser, newComment)
      .then((createdComment) => {
        setComments((prevComments) => [createdComment, ...prevComments]); // Add new comment at the top
        setNewComment(""); // Clear the input field
      })
      .catch(() => {
        alert("Failed to post comment."); // Handle submission error
      })
      .finally(() => setIsSubmitting(false)); // Re-enable submit button
  };

  // If loading, show the loading component
  if (loading) return <Loading />;

  // If there's an error, show the error message
  if (error) return <ErrorMessage msg={error.msg} />;

  return (
    <div className="comment-list">
      {/* Comment submission form - only show if user is logged in */}
      {loggedInUser && (
        <form onSubmit={handleCommentSubmit} className="comment-form">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)} // Update new comment state
            placeholder="Write your comment here..."
            required
          />
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Post Comment"}
          </button>
        </form>
      )}

      {/* Display existing comments */}
      {comments.length > 0 ? (
        comments.map((comment) => (
          <CommentCard
            key={comment.comment_id} // Ensure each comment has a unique key
            comment={comment}
            loggedInUser={loggedInUser} // Pass logged-in user state to CommentCard
            setComments={setComments} // Allow CommentCard to update the list of comments
          />
        ))
      ) : (
        <p>No comments yet. Be the first to comment!</p> // Message when no comments exist
      )}
    </div>
  );
};

export default CommentList;
