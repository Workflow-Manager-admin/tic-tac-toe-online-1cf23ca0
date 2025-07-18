import React, { useState, useEffect } from "react";
import "./App.css";
import GameBoard from "./components/GameBoard";
import PlayerIndicator from "./components/PlayerIndicator";
import ResetButton from "./components/ResetButton";
import TitleHeader from "./components/TitleHeader";
import AssistantChat from "./components/AssistantChat";

// Load .env variables (for future backend integration/config):
let endpoint = null;
if (window && window.process && window.process.env) {
  endpoint = process.env.REACT_APP_API_URL || null;
}

/**
 * Returns a blank 3x3 tic-tac-toe board (array)
 */
function createBlankBoard() {
  return [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];
}

/**
 * Checks for a winner on the board.
 * Returns {winner: 'X'|'O'|null, draw: boolean}
 */
function checkGameStatus(board) {
  const lines = [
    // Rows
    [{ r: 0, c: 0 }, { r: 0, c: 1 }, { r: 0, c: 2 }],
    [{ r: 1, c: 0 }, { r: 1, c: 1 }, { r: 1, c: 2 }],
    [{ r: 2, c: 0 }, { r: 2, c: 1 }, { r: 2, c: 2 }],
    // Columns
    [{ r: 0, c: 0 }, { r: 1, c: 0 }, { r: 2, c: 0 }],
    [{ r: 0, c: 1 }, { r: 1, c: 1 }, { r: 2, c: 1 }],
    [{ r: 0, c: 2 }, { r: 1, c: 2 }, { r: 2, c: 2 }],
    // Diagonals
    [{ r: 0, c: 0 }, { r: 1, c: 1 }, { r: 2, c: 2 }],
    [{ r: 0, c: 2 }, { r: 1, c: 1 }, { r: 2, c: 0 }],
  ];
  for (const line of lines) {
    const [a, b, c] = line;
    const v = board[a.r][a.c];
    if (v && v === board[b.r][b.c] && v === board[c.r][c.c]) {
      return { winner: v, draw: false };
    }
  }
  const isDraw = board.flat().every((cell) => cell !== null);
  return { winner: null, draw: isDraw };
}

// PUBLIC_INTERFACE
function App() {
  // game state
  const [board, setBoard] = useState(createBlankBoard());
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState(null);
  const [draw, setDraw] = useState(false);
  // Theme
  const [theme, setTheme] = useState("light");

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // Set theme to <html>
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Update winner/draw on every move
  useEffect(() => {
    const { winner: win, draw: drawResult } = checkGameStatus(board);
    setWinner(win);
    setDraw(!win && drawResult);
  }, [board]);

  // PUBLIC_INTERFACE
  const handleCellClick = (row, col) => {
    if (!board[row][col] && !winner && !draw) {
      const nextBoard = board.map((r, i) =>
        r.map((cell, j) => (i === row && j === col ? currentPlayer : cell))
      );
      setBoard(nextBoard);
      setCurrentPlayer((prev) => (prev === "X" ? "O" : "X"));
    }
  };

  // PUBLIC_INTERFACE
  const handleReset = () => {
    setBoard(createBlankBoard());
    setCurrentPlayer("X");
    setWinner(null);
    setDraw(false);
  };

  return (
    <div className="App">
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      >
        {theme === "light" ? "🌙 Dark" : "☀️ Light"}
      </button>
      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--bg-primary)",
        }}
      >
        <TitleHeader />
        <PlayerIndicator
          currentPlayer={currentPlayer}
          winner={winner}
          draw={draw}
        />
        <GameBoard
          board={board}
          onCellClick={handleCellClick}
          isGameOver={!!winner || draw}
        />
        <ResetButton onReset={handleReset} />
      </main>
      {/* Floating OpenAI Assistant Widget - see AssistantChat.js for details. */}
      <AssistantChat />
    </div>
  );
}

export default App;
