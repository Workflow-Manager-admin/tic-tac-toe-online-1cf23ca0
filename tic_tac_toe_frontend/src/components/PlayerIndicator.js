import React from "react";
import PropTypes from "prop-types";
import "./PlayerIndicator.css";

// PUBLIC_INTERFACE
function PlayerIndicator({ currentPlayer, winner, draw }) {
  /**
   * Props:
   *  currentPlayer: string, 'X' or 'O'
   *  winner: string, 'X' or 'O' or null
   *  draw: boolean
   */
  let message;
  if (winner) {
    message = (
      <span>
        <strong>Player {winner}</strong> wins!
      </span>
    );
  } else if (draw) {
    message = <span>It's a <strong>draw</strong>!</span>;
  } else {
    message = (
      <span>
        Turn: <strong>Player {currentPlayer}</strong>
      </span>
    );
  }

  return <div className="ttt-player-indicator">{message}</div>;
}

PlayerIndicator.propTypes = {
  currentPlayer: PropTypes.string,
  winner: PropTypes.string,
  draw: PropTypes.bool,
};

export default PlayerIndicator;
