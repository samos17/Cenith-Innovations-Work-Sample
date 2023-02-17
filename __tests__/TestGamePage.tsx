import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';

import { GamePage } from '../client/pages/GamePage';

import { startingHealth, startingMoves } from '../client/constants';

describe('GamePage', () => {
  const renderGamePage = (
    health?: number,
    moves?: number,
    gameOver?: boolean
  ): void => {
    render(
      <GamePage
        defaultHealth={health}
        defaultMoves={moves}
        defaultGameOver={gameOver}
      />
    );
  };

  it(`should show starting health (${startingHealth}) and starting moves (${startingMoves} with no props passed in)`, () => {
    renderGamePage();
    expect(screen.getByText(`Health: ${startingHealth}`)).toBeInTheDocument();
    expect(
      screen.getByText(`Moves Remaining: ${startingMoves}`)
    ).toBeInTheDocument();
  });

  it('should show game lost page when health or moves is less than or equal to 0 and game over is set to true', () => {
    renderGamePage(0, 10, true);
    expect(screen.getByText('You Lose!!')).toBeInTheDocument();
    cleanup();
    renderGamePage(10, 0, true);
    expect(screen.getByText('You Lose!!')).toBeInTheDocument();
  });

  it('should show game won page when gameOver is set to true', () => {
    renderGamePage(10, 10, true);
    expect(screen.getByText('You Won!!!!')).toBeInTheDocument();
  });
});
