import React from "react";
import { View, Light, Model, Slider } from "magic-script-components";

export class ExampleLight extends React.Component {
  state = {
    range: 0
  };

  onRangeChangeHandler = eventData => {
    this.setState({ range: eventData.Value });
  };

  render() {
    return (
      <View name="main-view">
        <Light
          localPosition={[0, 1, 0]}
          type="point"
          color={[0.1, 0.5, 1]}
          range={this.state.range}
        />
        <Slider
          localPosition={[0, 0.35, 0]}
          width={0.8}
          min={0}
          max={5}
          onSliderChanged={this.onRangeChangeHandler}
        />
        <Model
          localPosition={[-0.35, -0.25, 0]}
          localScale={[0.3, 0.3, 0.3]}
          modelPath={"res/path/to/your/model"}
          shader="diffuse-normal-spec"
        />
        <Model
          localPosition={[0.35, -0.25, 0]}
          localScale={[0.3, 0.3, 0.3]}
          modelPath={"res/path/to/your/model"}
          shader="pbr"
        />
      </View>
    );
  }
}