import React from 'react';
import PropTypes from 'prop-types';

import { Button } from 'magic-script-components';

// Component that renders a single square in the Tic Tac Toe board
export default function Square (props) {
  const color = props.value === 'X' ? [1, 0.1, 0.1, 1] : [0.1, 0.1, 1, 1];
  return (
    <Button name={props.name} width={0.15} height={0.15} textColor={color} roundness={0.1} onClick={props.onClick}>
      {props.value || ''}
    </Button>
  );
}

Square.propTypes = {
  name: PropTypes.string,
  onClick: PropTypes.func,
  value: PropTypes.string
};
