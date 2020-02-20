import React from "react";
import { View, WebView, Text } from "magic-script-components";

export class ExampleWebView extends React.Component {

  render() {

    return (
      <View name='main-view' >
        <WebView localPosition={[0, -0.2, 0]} width={1} height={0.8} url={'http://google.com'}/>
      </View>
    );
  }
}