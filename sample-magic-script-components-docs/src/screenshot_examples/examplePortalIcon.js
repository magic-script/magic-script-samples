import React from "react";
import { View, PortalIcon } from "magic-script-components";

export class ExamplePortalIcon extends React.Component {
  render() {
    return (
      <View name="main-view">
        <PortalIcon text="Portal Icon" iconSize="extra-large" />
      </View>
    );
  }
}