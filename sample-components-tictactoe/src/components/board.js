import React from 'react';
import PropTypes from 'prop-types';

import { GridLayout } from 'magic-script-components';
import { Square } from './index.js';

// Component that renders the full Tic Tac Toe board
export default function Board (props) {
  const renderSquare = (props, i) => {
    return (
      <Square
        key={i}
        name={'square-' + i}
        value={props.squares[i]}
        onClick={event => props.onClick(i)}
      />
    );
  };

  const items = [];
  for (let i = 0; i < 9; i++) {
    items.push(renderSquare(props, i));
  }
  return <GridLayout rows={3} columns={3} width={0.5} height={0.5}>{items}</GridLayout>;
}

Board.propTypes = {
  squares: PropTypes.arrayOf(PropTypes.string),
  onClick: PropTypes.func
};
