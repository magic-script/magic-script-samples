import React from 'react';

import { Button, vec4 } from 'magic-script-components';

export enum Player {
  X = 'X',
  O = 'O',
  None = ' '
}

interface Props {
  name: string;
  value: Player;
  onClick: (event: any) => void;
}

// Component that renders a single square in the Tic Tac Toe board
export default function Square (props: Props) {
  const color: vec4 = props.value === Player.X ? [1, 0.1, 0.1, 1] : [0.1, 0.1, 1, 1];
  return (
    <Button name={props.name} width={0.15} height={0.15} textColor={color} roundness={0.1} onClick={props.onClick}>
      {props.value || ''}
    </Button>
  );
}
