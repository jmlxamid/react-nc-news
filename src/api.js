import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://newsflash-qdc3.onrender.com/api",
  timeout: 1000,
});

export function getArticles() {
  return apiClient.get(`articles`).then((response) => {
    return response.data.articles;
  });
}

export function getArticleById(id) {
  return apiClient.get(`articles/${id}`).then((response) => {
    return response.data.article;
  });
}
