import React from "react";
import { View, Line } from "magic-script-components";

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
      <View name="main-view">
        <Line points={points} color={[0.5, 1.0, 0.25, 0.8]} />
      </View>
    );
  }
}