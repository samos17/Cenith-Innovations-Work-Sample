import React, { useState } from 'react';
import { GameStats } from '../components/GameStats';
import { GameRules } from '../components/GameRules';
import { GameBoard } from '../components/GameBoard';
import { startingHealth, startingMoves } from '../constants';

type propsType = {
  defaultHealth?: number;
  defaultMoves?: number;
  defaultGameOver?: boolean;
};

export const GamePage = ({
  defaultHealth = startingHealth,
  defaultMoves = startingMoves,
  defaultGameOver = false,
}: propsType) => {
  const [gameOver, setGameOver] = useState(defaultGameOver);
  const [health, setHealth] = useState(defaultHealth);
  const [moves, setMoves] = useState(defaultMoves);

  const resetGameBoard = () => {
    setGameOver(false);
    setHealth(200);
    setMoves(450);
  };

  if (gameOver && health > 0 && moves > 0) {
    return (
      <>
        <h1>You Won!!!!</h1>
        <GameStats health={health} moves={moves} />
        <button onClick={resetGameBoard}>Click Here to Try Again!</button>
      </>
    );
  } else if (gameOver)
    return (
      <>
        <h1>You Lose!!</h1>
        <GameStats health={health} moves={moves} />
        <button onClick={resetGameBoard}>Click Here to Try Again!</button>
      </>
    );
  else
    return (
      <div id="game-page-wrapper">
        <h1 id="game-title">The Impossible Game</h1>

        <div id="game-page">
          <GameStats health={health} moves={moves} />
          <GameBoard
            health={health}
            moves={moves}
            setHealth={setHealth}
            setMoves={setMoves}
            setGameOver={setGameOver}
          />
          <GameRules />
        </div>
      </div>
    );
};
