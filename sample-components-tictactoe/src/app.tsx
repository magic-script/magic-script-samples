import React from 'react';

import firebase from 'firebase/app';

import { View, AppProps } from 'magic-script-components';
import { PlayerChooser, Game } from './components/index.js';
import { Player } from './components/square.js';

interface Props extends AppProps {
  firebaseConfig?: object;
}

interface State {
  // Use null to indicate that no player has been chosen yet
  // (Blank ' ' is used to play for both 'X' and 'O')
  player: Player | null;
}

// Top-level application component -- renders either a player chooser or the game
export class TicTacToeApp extends React.Component<Props, State> {
  state: State = { player: null };

  useFirebase (): boolean {
    return this.props.firebaseConfig !== undefined && this.props.firebaseConfig !== null
      && this.props.firebaseConfig.hasOwnProperty('apiKey');
  }

  componentDidMount () {
    if (this.useFirebase()) {
      firebase.initializeApp(this.props.firebaseConfig!);
    }
  }

  onPlayerChosen = (player: Player | null) => {
    this.setState({ player });
  }

  render () {
    return (
      <View name="TicTacToe" localPosition={[-0.5, 0.5, 0]}>
        {this.state.player === null
          ? <PlayerChooser onPlayerChosen={this.onPlayerChosen}/>
          : (
            <Game
              player={this.state.player}
              onChoosePlayer={() => this.onPlayerChosen(null)}
              enableFirebase={this.useFirebase()}
            />
          )}
      </View>
    );
  }
}
