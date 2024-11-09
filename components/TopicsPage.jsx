import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";
import { getTopics } from "../src/api";

const TopicsPage = () => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getTopics()
      .then((data) => {
        setTopics(data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        const errorMsg = error.response
          ? error.response.data.msg
          : "An unexpected error occurred";
        setError({ msg: errorMsg });
      });
  }, []);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage msg={error.msg} />;

  return (
    <div>
      <h1>Topics</h1>
      <ul>
        {topics.map((topic) => (
          <li key={topic.slug}>{topic.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default TopicsPage;
