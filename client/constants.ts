export const boardWidth: number = 100;
export const boardHeight: number = 100;

export const startingHealth: number = 200;
export const startingMoves: number = 450;

export const rules: { [key: string]: { Health: number; Moves: number } } = {
  Blank: { Health: 0, Moves: -1 },
  Speeder: { Health: -5, Moves: 0 },
  Lava: { Health: -50, Moves: -10 },
  Mud: { Health: -10, Moves: -5 },
};


export const boxColors: { [key: string]: string} = {
  Start: 'green',
  End: 'red',
  Lava: 'rgba(234, 113, 113, 0.909)',
  Mud: 'rgba(142, 47, 47, 0.766)',
  Speeder: 'rgba(107, 204, 80, 0.717)',
  Blank: 'white',
};