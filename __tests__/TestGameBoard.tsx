import React from 'react';
import { render, cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { GameBoard } from '../client/components/GameBoard';
import { boardHeight, boardWidth } from '../client/constants';
import { createBoard } from '../client/helperFunctions';
import { boardType } from '../client/types';

describe('GameBoard', () => {
  const mockSetHealth = jest.fn();
  const mockSetMoves = jest.fn();
  const mockSetGameOver = jest.fn();
  window.alert = jest.fn()

  const boardInfo = createBoard();
  const { randomStartPosition, randomEndPosition, newBoard } = boardInfo;

  const renderGameBoard = (
    health: number,
    moves: number,
    inputBoard?: boardType,
    inputLocation?: string
  ) => {
    render(
      <GameBoard
        health={health}
        moves={moves}
        setHealth={mockSetHealth}
        setMoves={mockSetMoves}
        setGameOver={mockSetGameOver}
        inputBoard={inputBoard}
        inputLocation={inputLocation}
      />
    );
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should not call setHealth, setMoves, or setGameOver on initial render', () => {
    renderGameBoard(200, 450);
    expect(mockSetHealth).toBeCalledTimes(0);
    expect(mockSetMoves).toBeCalledTimes(0);
    expect(mockSetGameOver).toBeCalledTimes(0);
  });

  it("should call setHealth and setMoves when a player moves and doesn't land on the end square", async () => {
    renderGameBoard(200, 450, newBoard, `${randomStartPosition},0`);
    if (randomStartPosition + 1 < boardHeight)
      await userEvent.keyboard('{ArrowDown}');
    else await userEvent.keyboard('{ArrowUp}');
    expect(mockSetHealth).toBeCalledTimes(1);
    expect(mockSetMoves).toBeCalledTimes(1);
  });

  it('should set game over when player moved to "End" square', async () => {
    if (randomEndPosition - 1 >= 0) {
      const location = [randomEndPosition - 1, boardWidth - 1];
      renderGameBoard(200, 450, newBoard, location.join(','));
      await userEvent.keyboard('{ArrowDown}');
    } else {
      const location = [randomEndPosition + 1, boardWidth - 1];
      renderGameBoard(200, 450, newBoard, location.join());
      await userEvent.keyboard('{ArrowUp}');
    }

    expect(mockSetGameOver).toHaveBeenCalledTimes(1);
    expect(mockSetGameOver).toBeCalledWith(true);
  });

  it('should not update health or moves when an improper key is pressed', async () => {
    renderGameBoard(200, 450);
    await userEvent.keyboard('{Enter}');
    expect(mockSetHealth).toHaveBeenCalledTimes(0);
    expect(mockSetMoves).toHaveBeenCalledTimes(0);
  });

  it('should not update health or moves when a user tries to move out of bounds', async () => {
    renderGameBoard(200, 450, newBoard, '0,0');
    await userEvent.keyboard('{ArrowLeft}');
    await userEvent.keyboard('{ArrowUp}');
    expect(mockSetHealth).toHaveBeenCalledTimes(0);
    expect(mockSetMoves).toHaveBeenCalledTimes(0);
    cleanup();
    renderGameBoard(200, 450, newBoard, `${boardHeight - 1},${boardWidth - 1}`);
    await userEvent.keyboard('{ArrowRight}');
    await userEvent.keyboard('{ArrowDown}');
    expect(mockSetHealth).toHaveBeenCalledTimes(0);
    expect(mockSetMoves).toHaveBeenCalledTimes(0);
  });

  it('should update game over when health or moves is below 0', async () => {
    renderGameBoard(0, 14, newBoard, '0,0');
    await userEvent.keyboard('{ArrowDown}');
    expect(mockSetGameOver).toHaveBeenCalledTimes(1);
    expect(mockSetGameOver).toHaveBeenCalledWith(true);
  });
});
