import React from "react";
import { Model, View, Prism, Scene } from "magic-script-components";

export class ExampleModel extends React.Component {
  render() {
    return (
      <Scene>
        <Prism size={[1, 1, 0.2]} >
          <View name="main-view" alignment={'center-center'}>
            <Model
              localScale={[0.3, 0.3, 0.3]}
              localRotation={[0.2, 0.38268346, 0.0, 0.9238795]}
              modelPath={require('../../resources/static.glb')}
            />
          </View>
        </Prism>
      </Scene>
    );
  }
}