import React from 'react';
import { boardRowType } from '../types';
import { GameBoardBox } from './GameBoardBox';

type boardRowPropsType = {
  row: boardRowType;
  rowNum: number;
};

export const GameBoardRow = ({ row, rowNum }: boardRowPropsType) => {
  return (
    <div className="row">
      {row.map((el, colNum) => (
        <GameBoardBox
          id={`${rowNum},${colNum}`}
          type={el}
          key={`row:${rowNum}, col:${colNum}`}
        />
      ))}
    </div>
  );
};
