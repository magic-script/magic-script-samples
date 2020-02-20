import React from "react";
import { View, TimePicker } from "magic-script-components";

export class ExampleTimePicker extends React.Component {
  render() {
    return (
      <View name="main-view" localPosition={[-0.05, 0, 0]} localScale={[2,2,2]}>
        <TimePicker label="Pick Time" />
      </View>
    );
  }
}