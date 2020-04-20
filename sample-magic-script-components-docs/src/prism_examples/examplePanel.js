import React from "react";
import { View, Panel, Button, Scene, Prism } from "magic-script-components";

export class ExamplePanel extends React.Component {
  render() {
    const aShape = {
      size: [0.4, 0.4],
      offset: [0, 0, 0],
      roundness: 0.2
    };

    const bShape = {
      size: [0.4, 0.4],
      offset: [0, 0, 0],
      roundness: 0.8
    };

    return (
      <Scene>
        <Prism size={[1, 1, 0.2]} >
          <View name="main-view" alignment={'center-center'}>        <Panel
          localPosition={[0, 0.25, 0]}
          panelShape={aShape}
          cursorTransitionType="closest-edge"
          cursorVisible={true}
        >
          <Button
            text="Panel A"
            textSize={0.1}
            roundness={aShape.roundness}
            width={aShape.size[0]}
            height={aShape.size[1]}
          />
        </Panel>
        <Panel
          localPosition={[0, -0.25, 0]}
          panelShape={bShape}
          cursorTransitionType="center"
          cursorVisible={false}
        >
          <Button
            text="Panel B"
            textSize={0.1}
            roundness={bShape.roundness}
            width={aShape.size[0]}
            height={aShape.size[1]}
          />
        </Panel>
      </View>
      </Prism>
      </Scene>
    );
  }
}