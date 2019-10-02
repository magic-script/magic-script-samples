import React from 'react';
import PropTypes from 'prop-types';

import firebase from 'firebase/app';

import { View } from 'magic-script-components';
import { PlayerChooser, Game } from './components/index.js';

// Top-level application component -- renders either a player chooser or the game
export class TicTacToeApp extends React.Component {
  constructor (props) {
    super(props);

    this.state = { player: '?' };
    this.onPlayerChosen = this.onPlayerChosen.bind(this);
  }

  useFirebase () {
    return this.props.firebaseConfig && this.props.firebaseConfig.hasOwnProperty('apiKey');
  }

  componentDidMount () {
    if (this.useFirebase()) {
      firebase.initializeApp(this.props.firebaseConfig);
    }
  }

  onPlayerChosen (player) {
    this.setState({ player: player });
  }

  render () {
    return (
      <View name="TicTacToe" localPosition={[-0.5, 0.5, 0]}>
        {this.state.player === '?'
          ? <PlayerChooser onPlayerChosen={this.onPlayerChosen}/>
          : (
            <Game
              player={this.state.player}
              onChoosePlayer={() => this.onPlayerChosen('?')}
              enableFirebase={this.useFirebase()}
            />
          )}
      </View>
    );
  }
}

TicTacToeApp.propTypes = {
  firebaseConfig: PropTypes.object
};
