import React from 'react';

export const GameRules = () => {
  return (
    <p id="rules">
      <strong>Controls:</strong> Arrow Keys <br></br>
      <strong>Objective:</strong> Move from green square to red square <br></br>
      <strong>Blank (White Square):</strong> Health -0, Moves -1 <br></br>
      <strong>Speeder (Green Square):</strong> Health -5, Moves -0
      <br></br>
      <strong>Mud (Brown Square):</strong> Health -10, Moves -5<br></br>
      <strong>Lava (Peach Square):</strong> Health -50, Moves -10<br></br>
    </p>
  );
};
