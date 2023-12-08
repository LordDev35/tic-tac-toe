import React, { useState } from 'react';
import './App.css';

const initialSquares = Array(9).fill(null);

const JogoDaVelha = () => {
  const [squares, setSquares] = useState(initialSquares);
  const [isXNext, setIsXNext] = useState(true);

  const handleClick = (index) => {
    if (calcularVencedor(squares) || squares[index]) {
      return;
    }

    const newSquares = [...squares];
    newSquares[index] = isXNext ? 'X' : 'O';
    setSquares(newSquares);
    setIsXNext(!isXNext);
  };

  const renderSquare = (index) => {
    return (
      <button className="square" onClick={() => handleClick(index)}>
        {squares[index]}
      </button>
    );
  };

  const vencedor = calcularVencedor(squares);
  const status = vencedor
    ? `Vencedor: ${vencedor}`
    : `Próximo jogador: ${isXNext ? 'X' : 'O'}`;

  return (
    <div className="game">
      <div className="game-board">
        <div className="status">{status}</div>
        {[0, 1, 2].map((row) => (
          <div key={row} className="board-row">
            {[0, 1, 2].map((col) => renderSquare(row * 3 + col))}
          </div>
        ))}
      </div>
    </div>
  );
};

const calcularVencedor = (quadrados) => {
  const linhas = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < linhas.length; i++) {
    const [a, b, c] = linhas[i];
    if (quadrados[a] && quadrados[a] === quadrados[b] && quadrados[a] === quadrados[c]) {
      return quadrados[a];
    }
  }

  return null;
};

export default JogoDaVelha;