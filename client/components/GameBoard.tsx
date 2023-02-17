import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { boardType } from '../types';
import { rules } from '../constants';
import { createBoard, getNewLocation } from '../helperFunctions';

import { GameBoardRow } from './GameBoardRow';

type boardPropsType = {
  health: number;
  moves: number;
  setHealth: Dispatch<SetStateAction<number>>;
  setMoves: Dispatch<SetStateAction<number>>;
  setGameOver: Dispatch<SetStateAction<boolean>>;
  inputBoard?: boardType;
  inputLocation?: string;
};

export const GameBoard = ({
  health,
  moves,
  setHealth,
  setMoves,
  setGameOver,
  inputBoard,
  inputLocation,
}: boardPropsType) => {
  const initialBoard: boardType = [];
  const [board, setBoard] = useState(inputBoard ? inputBoard : initialBoard);
  const [location, setLocation] = useState(inputLocation ? inputLocation : '');

  const setInitialBoard = (): void => {
    const boardInfo = createBoard();
    setLocation(`${boardInfo.randomStartPosition},0`);
    setBoard(boardInfo.newBoard);
  };

  if (!inputBoard) {
    useEffect(() => {
      setInitialBoard();
    }, []);
  }

  const updateLocation = (newLocation: string): void => {
    setLocation(newLocation);
    const newBoxElement = document.getElementById(newLocation);
    if (newBoxElement) newBoxElement.style.backgroundColor = 'black';
  };

  const updateHealth = (boxValue: string): number => {
    const healthChange = rules[boxValue].Health;
    const newHealth = health + healthChange;
    setHealth(newHealth);
    return newHealth;
  };

  const updateMoves = (boxValue: string): number => {
    const movesChange = rules[boxValue].Moves;
    const newMoves = moves + movesChange;
    setMoves(newMoves);
    return newMoves;
  };

  type KeyboardEvent = {
    key: string;
  };

  function handleKeyDown(this: Window, ev: KeyboardEvent): void {
    const newLocationArray = getNewLocation(
      ev.key.slice(5).toLowerCase(),
      location,
      board
    );

    if (!newLocationArray) return;
    updateLocation(newLocationArray.join());

    const boxValue = board[newLocationArray[0]][newLocationArray[1]];
    if (boxValue === 'End') {
      setGameOver(true);
      return;
    }

    const newHealth = updateHealth(boxValue);
    const newMoves = updateMoves(boxValue);

    if (newHealth <= 0 || newMoves <= 0) setGameOver(true);
    
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div id="board" data-testid="game-board">
      {board.map((row, i) => (
        <GameBoardRow row={row} rowNum={i} key={`row:${i}`} />
      ))}
    </div>
  );
};
