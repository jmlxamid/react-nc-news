import React from "react";
import Lottie from "lottie-light-react";
import loadingHand from "../src/assets/animations/loading-animation.json";
import "../src/index.css";

const Loading = () => {
  return (
    <section className="center-layout">
      <article className="lottie-container">
        <div className="lottie">
          <Lottie animationData={loadingHand} loop={true} />
        </div>
      </article>
      <p>Loading, please wait...</p>
    </section>
  );
};

export default Loading;
