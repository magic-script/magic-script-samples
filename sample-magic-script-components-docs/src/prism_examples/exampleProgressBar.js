import React from "react";
import { View, ProgressBar, Text, Prism, Scene } from "magic-script-components";

export class ExampleProgressBar extends React.Component {
  render() {
    const colors = {
      beginColor: 'navy',
      endColor: 'blue'
    };

    return (
      <Scene>
        <Prism size={[1, 1, 0.2]} >
          <View name="main-view" alignment={'center-center'}>
            <Text localPosition={[-0.13, 0.05, 0]} textSize={0.035}>Downloading (80%)...</Text>
            <ProgressBar
              width={0.5}
              height={0.03}
              min={0}
              max={100}
              value={80}
              progressColor={colors}
            />
            <Text localPosition={[-0.26, -0.07, 0]} textSize={0.035}>0%</Text>
            <Text localPosition={[0.22, -0.07, 0]} textSize={0.035}>100%</Text>
          </View>
        </Prism>
      </Scene>
    );
  }
}