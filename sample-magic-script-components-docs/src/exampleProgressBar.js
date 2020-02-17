import React from "react";
import { View, ProgressBar } from "magic-script-components";

export class ExampleProgressBar extends React.Component {
  render() {
    const colors = {
      beginColor: [0.25, 0, 25, 0.8],
      endColor: [0.75, 0, 75, 0.8]
    };

    return (
      <View name="main-view">
        <ProgressBar
          width={0.8}
          height={0.03}
          value={0.6}
          progressColor={colors}
        />
      </View>
    );
  }
}