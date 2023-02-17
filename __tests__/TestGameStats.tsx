import React from 'react';
import { render, screen } from '@testing-library/react';

import { GameStats } from '../client/components/GameStats';

describe('GameStats', () => {
  
  beforeAll(() => {
    render(<GameStats health={127} moves={300} />);
  });

  it('should display the appropriate health and moves values', () => {
    expect(screen.getByText('Health: 127')).toBeInTheDocument();
    expect(screen.getByText('Moves Remaining: 300')).toBeInTheDocument();
  });
});
