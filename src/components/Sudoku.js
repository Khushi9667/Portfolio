import React, { useState, useEffect, useRef } from 'react';
import { initialBoard, solutionBoard } from './Sudoku-utils';

const Sudoku = () => {
  const [board, setBoard] = useState(initialBoard);
  const [glowingCell, setGlowingCell] = useState(null);
  const [isAnimating, setIsAnimating] = useState(true);
  
  const animationIntervalRef = useRef(null);

  useEffect(() => {
    if (!isAnimating) {
      return;
    }

    const emptyCells = [];
    initialBoard.forEach((row, rIndex) => {
      row.forEach((cell, cIndex) => {
        if (cell === 0) {
          emptyCells.push({ r: rIndex, c: cIndex });
        }
      });
    });

    for (let i = emptyCells.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [emptyCells[i], emptyCells[j]] = [emptyCells[j], emptyCells[i]];
    }

    let index = 0;
    animationIntervalRef.current = setInterval(() => {
      if (index >= emptyCells.length) {
        clearInterval(animationIntervalRef.current);
        setGlowingCell(null);
        setIsAnimating(false);
        return;
      }

      const { r, c } = emptyCells[index];
      setGlowingCell({ row: r, col: c });

      setTimeout(() => {
        setBoard(prevBoard => {
          const newBoard = prevBoard.map(row => [...row]);
          newBoard[r][c] = solutionBoard[r][c];
          return newBoard;
        });
      }, 200);

      index++;
    }, 300);

    return () => clearInterval(animationIntervalRef.current);
  }, [isAnimating]);

  const handleReset = () => {
    clearInterval(animationIntervalRef.current); 
    setBoard(initialBoard); 
    setGlowingCell(null); 
    setIsAnimating(false); 
  };

  const handleInputChange = (e, rowIndex, colIndex) => {
    const value = e.target.value;
    if (/^[1-9]?$/.test(value)) {
      const num = value === '' ? 0 : parseInt(value, 10);
      const newBoard = board.map(row => [...row]);
      newBoard[rowIndex][colIndex] = num;
      setBoard(newBoard);
    }
  };

  return (
    <div className="sudoku-container">
      <div className="sudoku-grid">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const isInitial = initialBoard[rowIndex][colIndex] !== 0;
            const isGlowing = glowingCell && glowingCell.row === rowIndex && glowingCell.col === colIndex;
            if (isInitial) {
              return (
                <div key={`${rowIndex}-${colIndex}`} className="sudoku-cell initial-cell">
                  {cell}
                </div>
              );
            }
            if (isAnimating) {
              return (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`sudoku-cell solved-cell ${isGlowing ? 'glowing-cell' : ''}`}
                >
                  {cell === 0 ? '' : cell}
                </div>
              );
            }
            const isWrong = cell !== 0 && cell !== solutionBoard[rowIndex][colIndex];
            return (
              <div key={`${rowIndex}-${colIndex}`} className="sudoku-cell">
                <input
                  type="text" 
                  inputMode="numeric"
                  className={`sudoku-input ${isWrong ? 'invalid-cell' : ''}`}
                  value={cell === 0 ? '' : cell}
                  onChange={(e) => handleInputChange(e, rowIndex, colIndex)}
                  maxLength="1"
                />
              </div>
            );
          })
        )}
      </div>
      <button onClick={handleReset} className="sudoku-reset-btn">
        Reset & Play
      </button>
    </div>
  );
};

export default Sudoku;
