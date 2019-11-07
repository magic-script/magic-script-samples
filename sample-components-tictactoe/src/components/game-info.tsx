import { ListView, ListViewItem, Text, View, Button } from 'magic-script-components';
import React from 'react';
import calculateWinner from './calculate-winner';
import { HistoryItem } from './game';
import { Player } from './square';


interface Props {
  history: HistoryItem[];
  onHistoryClick: (move: number) => void;
  player: Player;
  onChoosePlayer: () => void;
  stepNumber: number;
  xIsNext: boolean;
}

// Component that renders current game status and history of moves
export default function GameInfo (props: Props) {
  const current = props.history[props.stepNumber];
  const winner = calculateWinner(current.squares);

  const moves = props.history.map((step, move) => {
    const desc = move
      ? ('Go to move #' + move)
      : 'Go to game start';
    return (
      <ListViewItem key={move}>
        <Button roundness={0.1} textSize={0.03} onClick={event => props.onHistoryClick(move)}>
          {desc}
        </Button>
      </ListViewItem>
    );
  });

  // Add element to start of list for choosing player again
  moves.unshift(
    <ListViewItem key={'ChoosePlayer'}>
      <Button roundness={0.1} textSize={0.03} onClick={event => props.onChoosePlayer()}>
        {'Choose Player'}
      </Button>
    </ListViewItem>
  );

  let status;
  if (winner != Player.None) {
    if (props.player === Player.None) {
      status = winner + ' Wins!';
    } else {
      status = (winner === props.player) ? 'You Win!' : 'You Lose!';
    }
  } else {
    const nextPlayer = props.xIsNext ? Player.X : Player.O;
    status = 'Next player: ' + nextPlayer;
    if (props.player !== Player.None) {
      status += (nextPlayer === props.player) ? ' (You)' : ' (Opponent)';
    }
  }

  return (
    <View>
      <Text textSize={0.05} alignment="top-left">{status}</Text>
      <ListView width={0.5} height={0.42} localPosition={[0, -0.08, 0]}>{moves}</ListView>
    </View>
  );
}
