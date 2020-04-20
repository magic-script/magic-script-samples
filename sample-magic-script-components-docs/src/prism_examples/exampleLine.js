import React from "react";
import { View, Line, Scene, Prism } from "magic-script-components";

export class ExampleLine extends React.Component {
  render() {
    const points = [
      [-0.35, -0.35, -0.2],
      [0.35, 0.35, 0.2],
      [-0.35, -0.35, 0.2],
      [-0.35, 0.35, -0.2],
      [0.35, -0.35, 0.2],
      [-0.35, -0.35, -0.2]
    ];

    return (
      <Scene>
        <Prism size={[1, 1, 0.5]} >
          <View name="main-view" alignment={'center-center'}>
            <Line points={points} color={[0.5, 1.0, 0.25, 0.8]} />
          </View>
        </Prism>
      </Scene>
    );
  }
}