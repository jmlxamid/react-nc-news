import axios from "axios";
import axiosRetry from "axios-retry";

// Create an axios instance with retry configuration
const apiClient = axios.create({
  baseURL: "https://newsflash-qdc3.onrender.com/api",
  timeout: 20000,
});

// Configure axios to retry on failure
axiosRetry(apiClient, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  shouldResetTimeout: true, // Reset timeout after each retry
});

// Fetch all articles
export function getArticles() {
  return apiClient
    .get("articles")
    .then((response) => {
      return response.data.articles;
    })
    .catch((error) => {
      console.error("Error fetching articles:", error);
      throw error;
    });
}

// Fetch a specific article by its ID
export function getArticleById(article_id) {
  return apiClient
    .get(`articles/${article_id}`)
    .then((response) => {
      return response.data.article;
    })
    .catch((error) => {
      console.error(`Error fetching article by ID ${article_id}:`, error);
      throw error;
    });
}

// Fetch comments by article ID
export function getCommentsByArticleId(article_id) {
  return apiClient
    .get(`articles/${article_id}/comments`)
    .then((response) => {
      return response.data.comments;
    })
    .catch((error) => {
      console.error(
        `Error fetching comments for article ID ${article_id}:`,
        error
      );
      throw error;
    });
}

// Update the votes for an article
export function patchArticleVotes(article_id, inc_votes) {
  return apiClient
    .patch(`articles/${article_id}`, { inc_votes })
    .then((response) => response.data.article)
    .catch((error) => {
      console.error(
        `Error updating votes for article ID ${article_id}:`,
        error
      );
      throw error;
    });
}

// Fetch all users
export function getUsers() {
  return apiClient
    .get("users", { timeout: 20000 })
    .then((response) => response.data.users)
    .catch((error) => {
      console.error("Error fetching users:", error);
      throw error;
    });
}

// Add a new comment to an article
export const postComment = async (article_id, username, body) => {
  try {
    const response = await apiClient.post(`articles/${article_id}/comments`, {
      username,
      body,
    });
    return response.data.comment;
  } catch (error) {
    console.error("Error posting comment:", error);
    throw error;
  }
};

// Delete a comment by its ID
export const deleteComment = async (comment_id) => {
  try {
    await apiClient.delete(`comments/${comment_id}`);
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw error;
  }
};
