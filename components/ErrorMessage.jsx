import React from "react";
import PropTypes from "prop-types";

const ErrorMessage = ({ msg }) => (
  <p style={{ color: "red", fontWeight: "bold", textAlign: "center" }}>
    Error: {msg}
  </p>
);

ErrorMessage.propTypes = {
  msg: PropTypes.string.isRequired,
};

export default ErrorMessage;
