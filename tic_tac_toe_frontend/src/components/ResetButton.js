import React from "react";
import PropTypes from "prop-types";
import "./ResetButton.css";

// PUBLIC_INTERFACE
function ResetButton({ onReset }) {
  /** Props:
   *  onReset: function to call on click
   */
  return (
    <button className="ttt-reset-btn" onClick={onReset}>
      Reset Game
    </button>
  );
}

ResetButton.propTypes = {
  onReset: PropTypes.func.isRequired
};

export default ResetButton;
