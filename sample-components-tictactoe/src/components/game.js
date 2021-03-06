import React from 'react';
import PropTypes from 'prop-types';

import firebase from 'firebase/app';
import 'firebase/database';

import { View } from 'magic-script-components';
import { Board, GameInfo } from './index.js';
import { calculateWinner } from './calculate-winner.js';

// The main gameplay component that renders the Tic Tac Toe board
export default class Game extends React.Component {
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
    if (this.props.enableFirebase) {
      this.dbref().on('value', snapshot => {
        this.setState(snapshot.val());
      });
    }
  }

  componentWillUnmount () {
    if (this.props.enableFirebase) {
      this.dbref().off('value');
    }
  }

  dbref () {
    return firebase.database().ref('tic-tac-toe');
  }

  updateState (partialNewState) {
    this.setState(partialNewState, () => this.syncStateChange(this.state));
  }

  syncStateChange (state) {
    if (this.props.enableFirebase) {
      this.dbref().set(state, (error) => {
        console.error('Error writing state update', error);
      });
    }
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
            onChoosePlayer={this.props.onChoosePlayer}
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

Game.propTypes = {
  enableFirebase: PropTypes.bool,
  player: PropTypes.string,
  onChoosePlayer: PropTypes.func
};
