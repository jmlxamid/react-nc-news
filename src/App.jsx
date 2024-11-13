import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import ArticleList from "../components/ArticleList";
import ArticleDetail from "../components/ArticleDetail";
import { getUsers } from "./api";
import { UserProvider } from "./contexts/UserContext";
import UserDropdown from "../components/UserDropdown";
import Header from "../components/Header";

function App() {
  const [users, setUsers] = useState([]);
  const location = useLocation();

  useEffect(() => {
    getUsers()
      .then((data) => setUsers(data))
      .catch((err) => {
        console.error("Failed to fetch users", err);
      });
  }, []);

  const isDetailPage = location.pathname.startsWith("/articles/");

  return (
    <UserProvider>
      <div className={isDetailPage ? "center-layout" : "grid-layout"}>
        <Header />
        <UserDropdown users={users} />
        <Routes>
          <Route path="/" element={<ArticleList />} />
          <Route path="/articles" element={<ArticleList />} />
          <Route path="/articles/:article_id" element={<ArticleDetail />} />
        </Routes>
      </div>
    </UserProvider>
  );
}

export default App;
