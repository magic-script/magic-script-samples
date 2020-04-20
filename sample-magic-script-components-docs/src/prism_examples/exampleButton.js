import React from 'react';
import { View, Button } from 'magic-script-components';

export class ExampleButton extends React.Component {
  constructor(props) {
    super(props);
  }

  buttonClickHandler = event => {
    console.log('Hello from buttonClickHandler');
  };

  render() {
    return (
      <View>
        <Button
          localPosition={[0, 0.25, 0]}
          height={0.1}
          onClick={this.buttonClickHandler}
          roundness={0}
          textSize={0.05}
          width={0.3}
        >Square</Button>

        <Button
          height={0.1}
          onClick={this.buttonClickHandler}
          roundness={1}
          textSize={0.05}
          width={0.3}
        >Rounded</Button>

        <Button
          localPosition={[0, -0.25, 0]}
          height={0.1}
          onClick={this.buttonClickHandler}
          roundness={0.5}
          textColor={"yellow"}
          textSize={0.05}
          width={0.3}
        >Yellow</Button>
      </View>
    );
  }
}