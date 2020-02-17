import React from "react";
import { View, TimePicker } from "magic-script-components";

export class ExampleTimePicker extends React.Component {
  render() {
    return (
      <View name="main-view">
        <TimePicker label="Pick Time" />
      </View>
    );
  }
}