import React from 'react';

type statsProps = {
  health: number;
  moves: number;
};

export const GameStats = ({ health, moves }: statsProps) => {
  return (
    <div id="stats">
      <h3>Health: {health}</h3>
      <h3>Moves Remaining: {moves}</h3>
    </div>
  );
};
