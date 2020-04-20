import React from "react";
import { View, WebView, Prism, Scene } from "magic-script-components";

export class ExampleWebView extends React.Component {

  render() {
    return (
      <Scene>
        <Prism size={[1, 1, 0.2]} >
          <View name="main-view" alignment={'center-center'}>
            <WebView width={1} height={0.8} url={'https://www.magicleap.com'} />
          </View>
        </Prism>
      </Scene>
    );
  }
}