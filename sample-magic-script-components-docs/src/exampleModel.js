import React from "react";
import { Model, View } from "magic-script-components";

export class ExampleModel extends React.Component {
  render() {
    return (
      <View>
        <Model 
          localScale={[0.3, 0.3, 0.3]} 
          modelPath={require('../resources/static.glb')} 
        />
      </View>
    );
  }
}