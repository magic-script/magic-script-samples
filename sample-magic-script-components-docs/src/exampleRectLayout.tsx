import React from "react";
import { View, RectLayout, Content, Text } from "magic-script-components";

export class ExampleRectLayout extends React.Component {
  render() {
    return (
      <View name="main-view">
        <RectLayout
          localPosition={[-0.4, 0.4, 0]}
          width={0.8}
          height={0.4}
          padding={[0.1, 0.1, 0.1, 0.1]}
          contentAlignment="bottom-left"
        >
          <Content>
            <Text textSize={0.05} text="Top Message" />
          </Content>
        </RectLayout>
        <RectLayout
          localPosition={[-0.4, 0, 0]}
          width={0.8}
          height={0.4}
          padding={[0.1, 0.1, 0.1, 0.1]}
          contentAlignment="top-right"
        >
          <Content>
            <Text textSize={0.05} text="Bottom Message" />
          </Content>
        </RectLayout>
      </View>
    );
  }
}