import React from 'react';
import { render } from '@testing-library/react';

import { GameBoardRow } from '../client/components/GameBoardRow';
import { boardBoxType, boardRowType } from '../client/types';

describe('GameBoardRow', () => {
  const testRow: boardBoxType[] = [
    'Speeder',
    'Speeder',
    'Blank',
    'Lava',
    'Blank',
  ];
  const renderGameBoardRow = (row: boardRowType, rowNum: number) => {
    render(<GameBoardRow row={row} rowNum={rowNum} />);
  };

  beforeAll(() => {
    renderGameBoardRow(testRow, 0);
  });
  
  it('should render 5 boxes', () => {
    const boxes = document.getElementsByClassName('box');
    expect(boxes.length).toBe(5);
  });
});
