import React, { useEffect } from 'react';

import { boardBoxType } from '../types';

import { boxColors } from '../constants';

type boxProps = {
  id: string;
  type: boardBoxType;
};

export const GameBoardBox = ({ id, type }: boxProps) => {
  const setBoxColor = (type: string): void => {
    const boxElement = document.getElementById(id);
    if (boxElement) boxElement.style.backgroundColor = boxColors[type];
  };

  useEffect(() => {
    setBoxColor(type);
  }, []);

  if (boxColors.hasOwnProperty(type)) {
    return <div id={id} className="box"></div>;
  } else return <></>;
};
