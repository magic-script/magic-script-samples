import React from 'react';

import firebase from 'firebase/app';
import 'firebase/database';

import {
  Button,
  GridLayout,
  LinearLayout,
  ListView,
  ListViewItem,
  Text,
  View
} from 'magic-script-components';

// Component that renders a single square in the Tic Tac Toe board
function Square (props) {
  const color = props.value === 'X' ? [1, 0.1, 0.1, 1] : [0.1, 0.1, 1, 1];
  return (
    <Button name={props.name} width={0.15} height={0.15} textColor={color} roundness={0.1} onClick={props.onClick}>
      {props.value || ''}
    </Button>
  );
}

// Component that renders the full Tic Tac Toe board
function Board (props) {
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

// Component that renders current game status and history of moves
function GameInfo (props) {
  const current = props.history[props.stepNumber];
  const winner = calculateWinner(current.squares);

  let moves = props.history.map((step, move) => {
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
      <Button roundness={0.1} textSize={0.03} onClick={event => props.onPlayerChosen('?')}>
        {'Choose Player'}
      </Button>
    </ListViewItem>
  );

  let status;
  if (winner) {
    if (props.player === ' ') {
      status = winner + ' Wins!';
    } else {
      status = (winner === props.player) ? 'You Win!' : 'You Lose!';
    }
  } else {
    const nextPlayer = props.xIsNext ? 'X' : 'O';
    status = 'Next player: ' + nextPlayer;
    if (props.player !== ' ') {
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

// The main gameplay component that renders the Tic Tac Toe board
class Game extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill('')
        }
      ],
      stepNumber: 0,
      xIsNext: true
    };
  }

  componentDidMount () {
    this.dbref().on('value', snapshot => {
      this.setState(snapshot.val());
    });
  }

  componentWillUnmount () {
    this.dbref().off('value');
  }

  dbref () {
    return firebase.database().ref('tic-tac-toe');
  }

  updateState (partialNewState) {
    this.setState(partialNewState, () => this.syncStateChange(this.state));
  }

  syncStateChange (state) {
    this.dbref().set(state, (error) => {
      console.error('Error writing state update', error);
    });
  }

  handleClick (i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const nextPlayer = this.state.xIsNext ? 'X' : 'O';
    if (this.props.player !== ' ' && this.props.player !== nextPlayer) {
      return;
    }
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = nextPlayer;
    this.updateState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo (step) {
    this.updateState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  render () {
    const history = this.state.history;
    const current = history[this.state.stepNumber];

    return (
      <View name="game">
        <View name="game-board">
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
        </View>
        <View name="game-info" localPosition={[0.5, 0, 0]}>
          <GameInfo
            player={this.props.player}
            onPlayerChosen={this.props.onPlayerChosen}
            history={history}
            stepNumber={this.state.stepNumber}
            xIsNext={this.state.xIsNext}
            onHistoryClick={step => this.jumpTo(step)}
          />
        </View>
      </View>
    );
  }
}

function PlayerChooser (props) {
  return (
    <LinearLayout width={0.5} height={0.5} orientation="vertical">
      <text textSize={0.05} alignment="top-left">Choose a player:</text>
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

// Top-level application component -- renders either a player chooser or the game
export class TicTacToeApp extends React.Component {
  constructor (props) {
    super(props);

    this.state = { player: '?' };
    this.onPlayerChosen = this.onPlayerChosen.bind(this);
  }

  componentDidMount () {
    this.initFirebase();
  }

  onPlayerChosen (player) {
    this.setState({ player: player });
  }

  render () {
    return (
      <view name="TicTacToe" localPosition={[-0.5, 0.5, 0]}>
        {this.state.player === '?'
          ? <PlayerChooser onPlayerChosen={this.onPlayerChosen}/>
          : <Game player={this.state.player} onPlayerChosen={this.onPlayerChosen}/>}
      </view>
    );
  }

  initFirebase () {
    // Copy from Firebase console
    const firebaseConfig = {
      apiKey: undefined,
      authDomain: undefined,
      databaseURL: undefined,
      projectId: undefined,
      storageBucket: undefined,
      messagingSenderId: undefined,
      appId: undefined
    };

    firebase.initializeApp(firebaseConfig);
  }
}

function calculateWinner (squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
