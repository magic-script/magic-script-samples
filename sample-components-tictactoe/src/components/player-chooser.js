import React from 'react';
import PropTypes from 'prop-types';

import { LinearLayout, Text } from 'magic-script-components';
import { Square } from './index.js';

export default function PlayerChooser (props) {
  return (
    <LinearLayout width={0.5} height={0.5} orientation="vertical">
      <Text textSize={0.05} alignment="top-left">Choose a player:</Text>
      <Square
        value='X'
        name='ChoosePlayerX'
        onClick={event => props.onPlayerChosen('X')}
      />
      <Square
        value='O'
        name='ChoosePlayerO'
        onClick={event => props.onPlayerChosen('O')}
      />
      <Square
        value=' '
        name='ChoosePlayerBlank'
        onClick={event => props.onPlayerChosen(' ')}
      />
    </LinearLayout>
  );
}

PlayerChooser.propTypes = {
  onPlayerChosen: PropTypes.func
};
