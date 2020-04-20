import React from "react";
import { View, WebView, Text, Scene, Prism } from "magic-script-components";

export class SceneWebView extends React.Component {

  render() {

    return (
      <Scene>
        <Prism size={[1, 1, 0.2]} >
          <View name="main-view" alignment={'center-center'}>
            <Text text='WebView' textSize={0.05} localPosition={[0, 0.45, 0]} />
            <WebView localPosition={[-0.4, 0.4, 0]} width={0.8} height={0.8} url={'http://google.com'} />
          </View>
        </Prism>
      </Scene>
    );
  }
}