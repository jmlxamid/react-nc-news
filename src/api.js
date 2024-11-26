import axios from "axios";
import axiosRetry from "axios-retry";

const apiClient = axios.create({
  baseURL: "https://newsflash-qdc3.onrender.com/api",
  timeout: 20000,
});

axiosRetry(apiClient, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  shouldResetTimeout: true, // Reset timeout after each retry
});

export function getArticles() {
  return apiClient
    .get(`articles`)
    .then((response) => {
      return response.data.articles;
    })
    .catch((error) => {
      console.error("Error fetching articles:", error);
      throw error;
    });
}

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

export function getUsers() {
  return apiClient
    .get("users", { timeout: 20000 })
    .then((response) => response.data.users)
    .catch((error) => {
      console.error("Error fetching users:", error);
      throw error;
    });
}
