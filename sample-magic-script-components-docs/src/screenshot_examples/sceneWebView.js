import React from "react";
import { View, WebView, Text } from "magic-script-components";

export class SceneWebView extends React.Component {

  render() {

    return (
      <View name='main-view' >
        <Text text='WebView' textSize={0.05} localPosition={[0, 0.45, 0]} />
        <WebView localPosition={[-0.4, 0.4, 0]} width={0.8} height={0.8} url={'http://google.com'}/>
      </View>
    );
  }
}