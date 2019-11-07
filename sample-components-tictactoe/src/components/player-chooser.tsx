import React from 'react';

import { LinearLayout, Text } from 'magic-script-components';
import Square, { Player } from './square';

interface Props {
  onPlayerChosen: (player: Player) => void;
}

export default function PlayerChooser (props: Props) {
  return (
    <LinearLayout width={0.5} height={0.5} orientation="vertical">
      <Text textSize={0.05} alignment="top-left">Choose a player:</Text>
      <Square
        value={Player.X}
        name='ChoosePlayerX'
        onClick={event => props.onPlayerChosen(Player.X)}
      />
      <Square
        value={Player.O}
        name='ChoosePlayerO'
        onClick={event => props.onPlayerChosen(Player.O)}
      />
      <Square
        value={Player.None}
        name='ChoosePlayerBlank'
        onClick={event => props.onPlayerChosen(Player.None)}
      />
    </LinearLayout>
  );
}
