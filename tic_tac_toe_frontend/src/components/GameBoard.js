import React from "react";
import PropTypes from "prop-types";
import "./GameBoard.css";

// PUBLIC_INTERFACE
function GameBoard({ board, onCellClick, isGameOver }) {
  /** Game board props:
   *  board: Array(3).map(Array(3)), values: 'X', 'O', or null
   *  onCellClick: function(row, col)
   *  isGameOver: boolean, disables board if true
   */
  return (
    <div className="ttt-board" role="grid" aria-label="Tic Tac Toe Board">
      {board.map((row, i) => (
        <div className="ttt-row" key={i} role="row">
          {row.map((cell, j) => (
            <button
              className="ttt-cell"
              key={j}
              data-row={i}
              data-col={j}
              onClick={() => !isGameOver && !cell && onCellClick(i, j)}
              disabled={!!cell || isGameOver}
              aria-label={
                cell
                  ? `Cell ${i + 1}, ${j + 1}: ${cell}`
                  : `Cell ${i + 1}, ${j + 1}: empty`
              }
            >
              {cell}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}

GameBoard.propTypes = {
  board: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  onCellClick: PropTypes.func,
  isGameOver: PropTypes.bool,
};

export default GameBoard;
