import React from "react";
import {
  View,
  Spinner,
  Text,
  LinearLayout
} from "magic-script-components";

export class ExampleSpinner extends React.Component {

  render() {
    return (
      <View>
        <LinearLayout alignment='center-center' defaultItemAlignment='center-center' defaultItemPadding={[0.05, 0, 0, 0]}>
          <Spinner type="sprite-animation" height={0.25} determinate={false} />
          <Text textSize={0.04} >Your content is loading...</Text>
        </LinearLayout>
      </View>
    );
  }
}