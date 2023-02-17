import React from 'react';
import { render, cleanup } from '@testing-library/react';

import { GameBoardBox } from '../client/components/GameBoardBox';
import { boardBoxType } from '../client/types';
import { boxColors } from '../client/constants';

describe('Box', () => {
  const renderGameBoardBox = (type: boardBoxType) => {
    render(<GameBoardBox id="testing" type={type} />);
  };

  it('should render the correct color for each type of box', () => {
    for (const boxType of Object.keys(boxColors)) {
      renderGameBoardBox(boxType);
      const boxElement = document.getElementById('testing');
      if (boxElement) {
        const boxStyle = window.getComputedStyle(boxElement);
        expect(boxStyle.backgroundColor).toBe(boxColors[boxType]);
      }
      cleanup();
    }
  });

  it('should not render anything for an incorrect box type', () => {
    renderGameBoardBox('incorrect');
    expect(document.getElementsByClassName('box').length).toBe(0);
  });
});
