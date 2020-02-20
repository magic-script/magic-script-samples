import React from 'react';
import { TextEdit } from 'magic-script-components';

export class ExampleTextEdit extends React.Component {
  render() {
    return (
        <TextEdit
          alignment='center-center'
          charSpacing={0.02}
          height={0.2}
          lineSpacing={0.3}
          padding={[0.5, 0.3, 0.5, 0.3]}
          text='Edit Me'
          textSize={0.06}
          width={0.8}
        />
    );
  }
}
