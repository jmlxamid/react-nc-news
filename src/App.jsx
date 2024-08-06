import React from "react";
import { Routes, Route, Router } from "react-router-dom";
import ArticleList from "../components/ArticleList";
import ArticleDetail from "../components/ArticleDetail";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ArticleList />} />
        <Route path="/articles" element={<ArticleList />} />
        <Route path="/articles/:article_id" element={<ArticleDetail />} />
      </Routes>
    </div>
  );
}
export default App;
