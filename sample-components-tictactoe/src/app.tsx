import React from 'react';

import firebase from 'firebase/app';

import { View, AppProps } from 'magic-script-components';
import { PlayerChooser, Game } from './components/index.js';

interface Props extends AppProps {
  firebaseConfig?: object;
}

interface State {
  player: string;
}

// Top-level application component -- renders either a player chooser or the game
export class TicTacToeApp extends React.Component<Props, State> {
  state: State = { player: '?' };

  constructor (props: Props) {
    super(props);

    this.onPlayerChosen = this.onPlayerChosen.bind(this);
  }

  useFirebase (): boolean {
    return this.props.firebaseConfig !== undefined && this.props.firebaseConfig !== null
      && this.props.firebaseConfig.hasOwnProperty('apiKey');
  }

  componentDidMount () {
    if (this.useFirebase()) {
      firebase.initializeApp(this.props.firebaseConfig!);
    }
  }

  onPlayerChosen (player: string) {
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
