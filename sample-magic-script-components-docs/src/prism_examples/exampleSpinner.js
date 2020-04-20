import React from "react";
import {
  View,
  Spinner,
  Text,
  LinearLayout,
  Prism,
  Scene
} from "magic-script-components";

export class ExampleSpinner extends React.Component {

  render() {
    return (
      <Scene>
        <Prism size={[1, 1, 0.2]} >
          <View name="main-view" alignment={'center-center'}>
            <LinearLayout alignment='center-center' defaultItemAlignment='center-center' defaultItemPadding={[0.05, 0, 0, 0]}>
              <Spinner type="sprite-animation" height={0.25} determinate={false} />
              <Text textSize={0.04} >Your content is loading...</Text>
            </LinearLayout>
          </View>
        </Prism>
      </Scene>
    );
  }
}