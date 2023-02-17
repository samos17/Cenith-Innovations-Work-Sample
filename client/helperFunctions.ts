import { boardType, boardRowType, boardBoxType } from './types';
import { boardHeight, boardWidth, boxColors } from './constants';

export const createBoard = (): {
  randomStartPosition: number;
  randomEndPosition: number;
  newBoard: boardType;
} => {
  const options: boardBoxType[] = ['Blank', 'Speeder', 'Lava', 'Mud'];
  const newBoard: boardType = [];
  for (let row = 0; row < boardHeight; row++) {
    const currRow: boardRowType = [];
    for (let column = 0; column < boardWidth; column++) {
      const randomNum = Math.floor(Math.random() * 4);
      currRow.push(options[randomNum]);
    }
    newBoard.push(currRow);
  }

  const randomStartPosition = Math.floor(Math.random() * boardHeight);
  const randomEndPosition = Math.floor(Math.random() * boardHeight);

  newBoard[randomStartPosition][0] = 'Start';
  newBoard[randomEndPosition][boardWidth - 1] = 'End';
  return {
    randomStartPosition,
    randomEndPosition,
    newBoard,
  };
};

export const getNewLocation = (
  direction: string,
  location: string,
  board: boardType
): number[] | undefined => {
  const coordinateChanges: { [key: string]: number[] } = {
    down: [1, 0],
    up: [-1, 0],
    left: [0, -1],
    right: [0, 1],
  };

  if (!coordinateChanges.hasOwnProperty(direction)) return;

  const currBoxElement = document.getElementById(location);

  const currLocation = location.split(',');
  if (currBoxElement)
    currBoxElement.style.backgroundColor =
      boxColors[board[Number(currLocation[0])][Number(currLocation[1])]];
  const newLocation = [
    Number(currLocation[0]) + coordinateChanges[direction][0],
    Number(currLocation[1]) + coordinateChanges[direction][1],
  ];

  if (
    newLocation[0] < 0 ||
    newLocation[0] > boardHeight - 1 ||
    newLocation[1] < 0 ||
    newLocation[1] > boardWidth - 1
  ) {
    alert(`Cannot move ${direction}`);
    return;
  }

  return newLocation;
};
