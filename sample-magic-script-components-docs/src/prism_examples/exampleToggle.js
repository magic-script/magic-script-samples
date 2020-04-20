import React from "react";
import { View, Toggle, Scene, Prism } from "magic-script-components";

export class ExampleToggle extends React.Component {
  onSwitchHandler = eventData => {
  };

  render() {
    return (
      <Scene>
        <Prism size={[1, 1, 0.2]} >
          <View name="main-view" alignment={'center-center'}>
            <Toggle
              localPosition={[0, 0.1, 0]}
              text="Switch"
              type="default"
              height={0.05}
              textSize={0.05}
              onToggleChanged={this.onSwitchHandler}
            />
            <Toggle
              localPosition={[0, 0, 0]}
              text="Radio"
              type="radio"
              height={0.08}
              textSize={0.05}
              onToggleChanged={this.onSwitchHandler}
            />
            <Toggle
              localPosition={[0, -0.1, 0]}
              text="Checkbox"
              type="checkbox"
              height={0.05}
              textSize={0.05}
              onToggleChanged={this.onSwitchHandler}
            />
          </View>
        </Prism>
      </Scene>
    );
  }
}