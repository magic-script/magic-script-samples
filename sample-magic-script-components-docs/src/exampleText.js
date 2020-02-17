import React from "react";
import { Text } from "magic-script-components";

export class ExampleText extends React.Component {
  render() {
    return (
      <Text textSize={0.1} localPosition={[-0.3, 0, 0]}>
        Text Example
      </Text>
    );
  }
}
