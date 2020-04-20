import React from 'react';
import { View, ColorPicker, Scene, Prism } from 'magic-script-components';

export class ExampleColorPicker extends React.Component {
  onColorChanged = event => {
    // event.Color
    console.log('onColorChanged event received: ', event);
  };

  onColorConfirmed = event => {
    // event.Color
    console.log('onColorConfirmed event received: ', event);
  };

  onColorCanceled = event => {
    // event.Color
    console.log('onColorCanceled event received: ', event);
  };

  render() {
    return (
      <Scene>
        <Prism size={[2, 2, 1]} >
          <View name='main-view' alignment={'center-center'}>
            <ColorPicker
              height={0.15}
              color={[1, 0.5, 1, 0.8]}
              onColorChanged={this.onColorChanged}
              onColorConfirmed={this.onColorConfirmed}
              onColorCanceled={this.onColorCanceled} />
          </View>
        </Prism>
      </Scene>
    );
  }
}