import React from "react";
import { View, WebView } from "magic-script-components";

export class ExampleWebView extends React.Component {

  render() {

    return (
      <View name='main-view' >
        <WebView  width={1} height={0.8} url={'https://www.magicleap.com'}/>
      </View>
    );
  }
}